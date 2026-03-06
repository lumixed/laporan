// LaporIn - API Client
// All data is now fetched from the real backend at http://localhost:3001

const API_BASE = 'http://localhost:3001/api';

const CATEGORIES = [
    { id: 'jalan', label: 'Jalan Rusak', icon: '', color: '#e74c3c' },
    { id: 'sungai', label: 'Sungai Kotor', icon: '', color: '#2980b9' },
    { id: 'sampah', label: 'Tumpukan Sampah', icon: '', color: '#27ae60' },
    { id: 'lampu', label: 'Lampu Mati', icon: '', color: '#f39c12' },
    { id: 'banjir', label: 'Banjir', icon: '', color: '#8e44ad' },
    { id: 'fasilitas', label: 'Fasilitas Umum', icon: '', color: '#16a085' },
    { id: 'keamanan', label: 'Keamanan', icon: '', color: '#c0392b' },
    { id: 'lainnya', label: 'Lainnya', icon: '', color: '#7f8c8d' },
];

const STATUSES = {
    dilaporkan: { label: 'Dilaporkan', color: '#e74c3c', icon: '' },
    diverifikasi: { label: 'Diverifikasi', color: '#f39c12', icon: '' },
    diproses: { label: 'Sedang Diproses', color: '#3498db', icon: '' },
    selesai: { label: 'Selesai', color: '#27ae60', icon: '' },
};

const DEPARTMENTS = [
    'Dinas Pekerjaan Umum', 'Dinas Lingkungan Hidup', 'Dinas Perhubungan',
    'Dinas Kebersihan', 'Satpol PP', 'BPBD',
];

const LEADERBOARD = [
    { name: 'Budi Santoso', city: 'Jakarta', reports: 89, badge: 'Penjaga Kota', points: 4450 },
    { name: 'Siti Rahayu', city: 'Surabaya', reports: 76, badge: 'Penjaga Kota', points: 3800 },
    { name: 'Ahmad Fauzi', city: 'Bandung', reports: 65, badge: 'Agen Perubahan', points: 3250 },
    { name: 'Dewi Putri', city: 'Medan', reports: 54, badge: 'Agen Perubahan', points: 2700 },
    { name: 'Eko Prasetyo', city: 'Semarang', reports: 48, badge: 'Pahlawan Lingkungan', points: 2400 },
];

const ACHIEVEMENTS = [
    { id: 'first', icon: '', name: 'Superhero Warga', desc: 'Laporan pertama berhasil dikirim', points: 50 },
    { id: 'upvote10', icon: '', name: 'Pahlawan Lingkungan', desc: '10 laporan mendapat upvote komunitas', points: 200 },
    { id: 'resolved', icon: '', name: 'Agen Perubahan', desc: '1 laporan berhasil diselesaikan pemerintah', points: 500 },
    { id: 'reports50', icon: '', name: 'Penjaga Kota', desc: '50 laporan telah dikirimkan', points: 2500 },
];

const APP_STATS = { totalReports: 12847, resolved: 8934, cities: 34, volunteers: 45230 };

// ─── Utility functions ─────────────────────────────────────────────────────

function getCategory(id) { return CATEGORIES.find(c => c.id === id) || CATEGORIES[7]; }
function getStatus(id) { return STATUSES[id] || STATUSES.dilaporkan; }

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor(diff / 60000);
    if (days > 0) return `${days} hari lalu`;
    if (hours > 0) return `${hours} jam lalu`;
    return `${mins} menit lalu`;
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ─── API helpers ───────────────────────────────────────────────────────────

// Unique voter ID stored in sessionStorage so upvotes track per browser session
function getVoterId() {
    let id = sessionStorage.getItem('laporan_voter_id');
    if (!id) { id = 'voter_' + Math.random().toString(36).slice(2); sessionStorage.setItem('laporan_voter_id', id); }
    return id;
}

async function apiLoadReports() {
    const res = await fetch(`${API_BASE}/reports`);
    if (!res.ok) throw new Error('Failed to load reports');
    return res.json();
}

async function apiLoadReport(id) {
    const res = await fetch(`${API_BASE}/reports/${id}`);
    if (!res.ok) return null;
    return res.json();
}

async function apiUpvote(id) {
    const res = await fetch(`${API_BASE}/reports/${id}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voterId: getVoterId() }),
    });
    if (!res.ok) throw new Error('Upvote failed');
    return res.json(); // { upvotes, upvoted }
}

async function apiAddComment(reportId, text, user = 'Anda') {
    const res = await fetch(`${API_BASE}/reports/${reportId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, text }),
    });
    if (!res.ok) throw new Error('Comment failed');
    return res.json();
}

async function apiUpdateStatus(reportId, status, department, note) {
    const res = await fetch(`${API_BASE}/reports/${reportId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, department, note }),
    });
    if (!res.ok) throw new Error('Status update failed');
    return res.json();
}

async function apiSubmitReport(formData) {
    const res = await fetch(`${API_BASE}/reports`, { method: 'POST', body: formData });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Submission failed');
    }
    return res.json();
}

async function apiGetStats() {
    try {
        const res = await fetch(`${API_BASE}/stats`);
        return res.ok ? res.json() : APP_STATS;
    } catch { return APP_STATS; }
}

// Legacy shims — keep these so any remaining inline code doesn't crash
function initData() { }
function loadReports() { return []; }
function saveReports() { }
