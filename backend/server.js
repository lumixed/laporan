const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { db, runAsync, getAsync, allAsync, initDb } = require('./database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ─── Helper ────────────────────────────────────────────────────────────────

async function buildReport(row) {
    const comments = await allAsync('SELECT * FROM comments WHERE report_id = ? ORDER BY id ASC', [row.id]);
    const timeline = await allAsync('SELECT * FROM timeline_events WHERE report_id = ? ORDER BY id ASC', [row.id]);
    return {
        id: row.id, title: row.title, description: row.description,
        category: row.category, status: row.status, city: row.city,
        district: row.district, address: row.address, lat: row.lat, lng: row.lng,
        photo: row.photo, reporter: row.reporter, reporterBadge: row.reporter_badge,
        department: row.department, upvotes: row.upvotes,
        createdAt: row.created_at, updatedAt: row.updated_at,
        comments: comments.map(c => ({ user: c.user, text: c.text, time: c.time })),
        timeline: timeline.map(t => ({ status: t.status, note: t.note, date: t.date })),
        upvotedBy: [],
    };
}

async function generateId() {
    const row = await getAsync('SELECT COUNT(*) as c FROM reports');
    return `RPT-${String(row.c + 1).padStart(3, '0')}`;
}

// ─── Routes ────────────────────────────────────────────────────────────────

app.get('/api/reports', async (req, res) => {
    try {
        const rows = await allAsync('SELECT * FROM reports ORDER BY created_at DESC');
        const reports = await Promise.all(rows.map(buildReport));
        res.json(reports);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/reports/:id', async (req, res) => {
    try {
        const row = await getAsync('SELECT * FROM reports WHERE id = ?', [req.params.id]);
        if (!row) return res.status(404).json({ error: 'Report not found' });
        res.json(await buildReport(row));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/reports', upload.single('photo'), async (req, res) => {
    try {
        const { title, description, category, city, district, address, lat, lng, reporter } = req.body;
        if (!title || !description || !category || !city) {
            return res.status(400).json({ error: 'Missing required fields: title, description, category, city' });
        }
        const id = await generateId();
        const now = new Date().toISOString();
        let photoUrl = req.body.photoUrl || null;
        if (req.file) photoUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

        await runAsync(
            `INSERT INTO reports (id,title,description,category,status,city,district,address,lat,lng,photo,reporter,reporter_badge,department,upvotes,created_at,updated_at) VALUES (?,?,?,?,'dilaporkan',?,?,?,?,?,?,?,'Superhero Warga',NULL,0,?,?)`,
            [id, title, description, category, city, district || null, address || null,
                lat ? parseFloat(lat) : null, lng ? parseFloat(lng) : null,
                photoUrl, reporter || 'Anonim', now, now]
        );
        await runAsync(`INSERT INTO timeline_events (report_id,status,note,date) VALUES (?,'dilaporkan','Laporan diterima oleh sistem',?)`, [id, now]);

        const row = await getAsync('SELECT * FROM reports WHERE id = ?', [id]);
        res.status(201).json(await buildReport(row));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/reports/:id/upvote', async (req, res) => {
    try {
        const { voterId } = req.body;
        const id = req.params.id;
        const voter = voterId || 'anonymous';
        const existing = await getAsync('SELECT * FROM upvotes WHERE report_id = ? AND voter_id = ?', [id, voter]);

        if (existing) {
            await runAsync('DELETE FROM upvotes WHERE report_id = ? AND voter_id = ?', [id, voter]);
            await runAsync('UPDATE reports SET upvotes = upvotes - 1 WHERE id = ?', [id]);
        } else {
            await runAsync('INSERT INTO upvotes (report_id,voter_id) VALUES (?,?)', [id, voter]);
            await runAsync('UPDATE reports SET upvotes = upvotes + 1 WHERE id = ?', [id]);
        }

        const row = await getAsync('SELECT upvotes FROM reports WHERE id = ?', [id]);
        res.json({ upvotes: row.upvotes, upvoted: !existing });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/reports/:id/comments', async (req, res) => {
    try {
        const { user, text } = req.body;
        if (!text) return res.status(400).json({ error: 'Comment text is required' });
        const id = req.params.id;
        const report = await getAsync('SELECT id FROM reports WHERE id = ?', [id]);
        if (!report) return res.status(404).json({ error: 'Report not found' });
        await runAsync('INSERT INTO comments (report_id,user,text,time) VALUES (?,?,?,?)', [id, user || 'Anonim', text, 'Baru saja']);
        res.status(201).json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/reports/:id/status', async (req, res) => {
    try {
        const { status, department, note } = req.body;
        if (!status) return res.status(400).json({ error: 'Status is required' });
        const id = req.params.id;
        const now = new Date().toISOString();
        await runAsync('UPDATE reports SET status = ?, department = ?, updated_at = ? WHERE id = ?', [status, department || null, now, id]);
        await runAsync('INSERT INTO timeline_events (report_id,status,note,date) VALUES (?,?,?,?)', [id, status, note || 'Status diperbarui oleh admin', now]);
        const row = await getAsync('SELECT * FROM reports WHERE id = ?', [id]);
        res.json(await buildReport(row));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/stats', async (req, res) => {
    try {
        const total = (await getAsync('SELECT COUNT(*) as c FROM reports')).c;
        const resolved = (await getAsync("SELECT COUNT(*) as c FROM reports WHERE status = 'selesai'")).c;
        const cities = (await getAsync('SELECT COUNT(DISTINCT city) as c FROM reports')).c;
        res.json({ totalReports: total, resolved, cities, volunteers: Math.max(total * 3, 100) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Start
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`LaporIn backend ready at http://localhost:${PORT}`);
        console.log(`Frontend: http://localhost:${PORT}`);
        console.log(`API: http://localhost:${PORT}/api`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});
