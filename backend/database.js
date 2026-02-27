const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'laporan.db'));

function runAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

function getAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => { if (err) reject(err); else resolve(row); });
    });
}

function allAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => { if (err) reject(err); else resolve(rows); });
    });
}

async function initDb() {
    await runAsync(`CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'dilaporkan',
        city TEXT NOT NULL,
        district TEXT,
        address TEXT,
        lat REAL,
        lng REAL,
        photo TEXT,
        reporter TEXT,
        reporter_badge TEXT DEFAULT 'Superhero Warga',
        department TEXT,
        upvotes INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        report_id TEXT NOT NULL,
        user TEXT NOT NULL,
        text TEXT NOT NULL,
        time TEXT NOT NULL
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS timeline_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        report_id TEXT NOT NULL,
        status TEXT NOT NULL,
        note TEXT NOT NULL,
        date TEXT NOT NULL
    )`);

    await runAsync(`CREATE TABLE IF NOT EXISTS upvotes (
        report_id TEXT NOT NULL,
        voter_id TEXT NOT NULL,
        PRIMARY KEY (report_id, voter_id)
    )`);

    const count = await getAsync('SELECT COUNT(*) as c FROM reports');
    if (count.c === 0) {
        await seedData();
    }
}

async function seedData() {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const reports = [
        { id: 'RPT-001', title: 'Jalan berlubang dalam di Jl. Sudirman', description: 'Ada lubang besar di tengah jalan yang membahayakan pengendara motor. Sudah ada beberapa motor yang jatuh. Tolong segera diperbaiki!', category: 'jalan', status: 'diproses', city: 'Jakarta', district: 'Jakarta Pusat', address: 'Jl. Jenderal Sudirman No. 45', lat: -6.2088, lng: 106.8456, photo: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=600&q=80', reporter: 'Budi S.', reporter_badge: 'Pahlawan Lingkungan', department: 'Dinas Pekerjaan Umum', upvotes: 142, created_at: new Date(now - 3 * day).toISOString(), updated_at: new Date(now - day).toISOString() },
        { id: 'RPT-002', title: 'Sampah menumpuk di Kali Ciliwung', description: 'Tumpukan sampah plastik sangat banyak dan menghambat aliran sungai. Bau tidak sedap mengganggu warga sekitar.', category: 'sungai', status: 'diverifikasi', city: 'Jakarta', district: 'Jakarta Timur', address: 'Kali Ciliwung, dekat Jembatan Kampung Melayu', lat: -6.2217, lng: 106.8602, photo: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&q=80', reporter: 'Dewi P.', reporter_badge: 'Agen Perubahan', department: 'Dinas Lingkungan Hidup', upvotes: 89, created_at: new Date(now - 5 * day).toISOString(), updated_at: new Date(now - 2 * day).toISOString() },
        { id: 'RPT-003', title: 'Lampu jalan mati sepanjang 200 meter', description: 'Sudah 2 minggu lampu penerangan jalan mati, sangat berbahaya untuk pejalan kaki dan pengendara di malam hari.', category: 'lampu', status: 'selesai', city: 'Bandung', district: 'Bandung Utara', address: 'Jl. Cihampelas No. 123', lat: -6.8917, lng: 107.6098, photo: 'https://images.unsplash.com/photo-1558383409-b3a7a9df4293?w=600&q=80', reporter: 'Hendra W.', reporter_badge: 'Superhero Warga', department: 'Dinas Perhubungan', upvotes: 234, created_at: new Date(now - 10 * day).toISOString(), updated_at: new Date(now - day).toISOString() },
        { id: 'RPT-004', title: 'Tumpukan sampah liar di pinggir jalan', description: 'Ada tempat pembuangan sampah liar yang sudah menggunung dan tidak ada petugas yang membersihkan.', category: 'sampah', status: 'dilaporkan', city: 'Surabaya', district: 'Surabaya Selatan', address: 'Jl. Ahmad Yani Km. 5', lat: -7.2575, lng: 112.7521, photo: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&q=80', reporter: 'Rina M.', reporter_badge: 'Superhero Warga', department: null, upvotes: 45, created_at: new Date(now - day).toISOString(), updated_at: new Date(now - day).toISOString() },
        { id: 'RPT-005', title: 'Banjir parah di kawasan perumahan', description: 'Setiap hujan deras, kawasan perumahan kami selalu banjir setinggi 50cm. Saluran drainase tersumbat dan perlu diperbaiki.', category: 'banjir', status: 'diproses', city: 'Semarang', district: 'Semarang Barat', address: 'Perumahan Bumi Raya Indah', lat: -6.9932, lng: 110.4203, photo: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&q=80', reporter: 'Agus T.', reporter_badge: 'Agen Perubahan', department: 'BPBD', upvotes: 178, created_at: new Date(now - 7 * day).toISOString(), updated_at: new Date(now - 2 * day).toISOString() },
        { id: 'RPT-006', title: 'Fasilitas taman rusak dan tidak terawat', description: 'Bangku taman rusak, tempat sampah hilang, dan rerumputan tidak dipotong. Taman tidak bisa digunakan warga.', category: 'fasilitas', status: 'diverifikasi', city: 'Medan', district: 'Medan Kota', address: 'Taman Tugu, Jl. Balai Kota', lat: 3.5952, lng: 98.6722, photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', reporter: 'Yusuf A.', reporter_badge: 'Superhero Warga', department: 'Dinas Kebersihan', upvotes: 67, created_at: new Date(now - 4 * day).toISOString(), updated_at: new Date(now - day).toISOString() },
        { id: 'RPT-007', title: 'Penerangan taman kota tidak berfungsi', description: 'Sudah satu bulan penerangan di taman kota mati sehingga rawan kejahatan di malam hari.', category: 'lampu', status: 'dilaporkan', city: 'Yogyakarta', district: 'Kota Yogyakarta', address: 'Taman Pintar, Jl. Panembahan Senopati', lat: -7.8014, lng: 110.3648, photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', reporter: 'Sri W.', reporter_badge: 'Superhero Warga', department: null, upvotes: 33, created_at: new Date(now - 2 * day).toISOString(), updated_at: new Date(now - 2 * day).toISOString() },
        { id: 'RPT-008', title: 'Sungai Brantas tercemar limbah industri', description: 'Air sungai berubah warna menjadi hitam pekat dan berbau menyengat. Banyak ikan mati. Diduga akibat pembuangan limbah pabrik.', category: 'sungai', status: 'diproses', city: 'Surabaya', district: 'Surabaya Barat', address: 'Sungai Brantas, Kawasan Industri Rungkut', lat: -7.3305, lng: 112.7767, photo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', reporter: 'Eko P.', reporter_badge: 'Pahlawan Lingkungan', department: 'Dinas Lingkungan Hidup', upvotes: 312, created_at: new Date(now - 6 * day).toISOString(), updated_at: new Date(now - day).toISOString() },
    ];

    const timelines = {
        'RPT-001': [{ status: 'dilaporkan', note: 'Laporan diterima oleh sistem', date: new Date(now - 3 * day).toISOString() }, { status: 'diverifikasi', note: 'Laporan diverifikasi oleh petugas', date: new Date(now - 2 * day).toISOString() }, { status: 'diproses', note: 'Dinas PU telah menugaskan tim perbaikan', date: new Date(now - day).toISOString() }],
        'RPT-002': [{ status: 'dilaporkan', note: 'Laporan diterima oleh sistem', date: new Date(now - 5 * day).toISOString() }, { status: 'diverifikasi', note: 'Tim lingkungan hidup telah memverifikasi', date: new Date(now - 2 * day).toISOString() }],
        'RPT-003': [{ status: 'dilaporkan', note: 'Laporan diterima', date: new Date(now - 10 * day).toISOString() }, { status: 'diverifikasi', note: 'Diverifikasi oleh petugas lapangan', date: new Date(now - 8 * day).toISOString() }, { status: 'diproses', note: 'Tim teknis sedang melakukan perbaikan', date: new Date(now - 5 * day).toISOString() }, { status: 'selesai', note: 'Perbaikan selesai, semua lampu sudah berfungsi', date: new Date(now - day).toISOString() }],
        'RPT-004': [{ status: 'dilaporkan', note: 'Laporan diterima oleh sistem', date: new Date(now - day).toISOString() }],
        'RPT-005': [{ status: 'dilaporkan', note: 'Laporan diterima', date: new Date(now - 7 * day).toISOString() }, { status: 'diverifikasi', note: 'Tim BPBD melakukan survei', date: new Date(now - 5 * day).toISOString() }, { status: 'diproses', note: 'Perbaikan drainase dijadwalkan', date: new Date(now - 2 * day).toISOString() }],
        'RPT-006': [{ status: 'dilaporkan', note: 'Laporan diterima', date: new Date(now - 4 * day).toISOString() }, { status: 'diverifikasi', note: 'Petugas memverifikasi kondisi taman', date: new Date(now - day).toISOString() }],
        'RPT-007': [{ status: 'dilaporkan', note: 'Laporan diterima', date: new Date(now - 2 * day).toISOString() }],
        'RPT-008': [{ status: 'dilaporkan', note: 'Laporan diterima', date: new Date(now - 6 * day).toISOString() }, { status: 'diverifikasi', note: 'Tim investigasi diturunkan', date: new Date(now - 4 * day).toISOString() }, { status: 'diproses', note: 'Penyelidikan sumber pencemaran sedang berlangsung', date: new Date(now - day).toISOString() }],
    };

    const comments = {
        'RPT-001': [{ user: 'Siti R.', text: 'Saya juga hampir jatuh kemarin! Tolong cepat diperbaiki.', time: '2 hari lalu' }, { user: 'Ahmad F.', text: 'Sudah dilaporkan ke RT juga tapi belum ada tindakan.', time: '1 hari lalu' }],
        'RPT-002': [{ user: 'Rudi K.', text: 'Ini sudah sangat parah, sudah lama tidak dibersihkan.', time: '4 hari lalu' }],
        'RPT-005': [{ user: 'Wati S.', text: 'Saya sudah 5 tahun tinggal di sini dan selalu banjir!', time: '6 hari lalu' }, { user: 'Bambang P.', text: 'BPBD sudah datang survei kemarin.', time: '2 hari lalu' }],
        'RPT-008': [{ user: 'Hadi S.', text: 'Ini sudah terjadi berulang kali! Harus ada tindakan tegas!', time: '5 hari lalu' }, { user: 'Lina F.', text: 'Sudah ada tim yang turun ke lapangan kemarin.', time: '1 hari lalu' }],
    };

    for (const r of reports) {
        await runAsync(`INSERT INTO reports (id,title,description,category,status,city,district,address,lat,lng,photo,reporter,reporter_badge,department,upvotes,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [r.id, r.title, r.description, r.category, r.status, r.city, r.district, r.address, r.lat, r.lng, r.photo, r.reporter, r.reporter_badge, r.department, r.upvotes, r.created_at, r.updated_at]);
        for (const t of (timelines[r.id] || [])) {
            await runAsync('INSERT INTO timeline_events (report_id,status,note,date) VALUES (?,?,?,?)', [r.id, t.status, t.note, t.date]);
        }
        for (const c of (comments[r.id] || [])) {
            await runAsync('INSERT INTO comments (report_id,user,text,time) VALUES (?,?,?,?)', [r.id, c.user, c.text, c.time]);
        }
    }
    console.log('Database seeded.');
}

module.exports = { db, runAsync, getAsync, allAsync, initDb };
