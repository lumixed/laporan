// LaporIn - Mock Data
const CATEGORIES = [
    { id: 'jalan', label: 'Jalan Rusak', icon: '🛣️', color: '#e74c3c' },
    { id: 'sungai', label: 'Sungai Kotor', icon: '🌊', color: '#2980b9' },
    { id: 'sampah', label: 'Tumpukan Sampah', icon: '🗑️', color: '#27ae60' },
    { id: 'lampu', label: 'Lampu Mati', icon: '💡', color: '#f39c12' },
    { id: 'banjir', label: 'Banjir', icon: '🌧️', color: '#8e44ad' },
    { id: 'fasilitas', label: 'Fasilitas Umum', icon: '🏛️', color: '#16a085' },
    { id: 'keamanan', label: 'Keamanan', icon: '🚨', color: '#c0392b' },
    { id: 'lainnya', label: 'Lainnya', icon: '📋', color: '#7f8c8d' },
];

const STATUSES = {
    dilaporkan: { label: 'Dilaporkan', color: '#e74c3c', icon: '📍' },
    diverifikasi: { label: 'Diverifikasi', color: '#f39c12', icon: '✅' },
    diproses: { label: 'Sedang Diproses', color: '#3498db', icon: '⚙️' },
    selesai: { label: 'Selesai', color: '#27ae60', icon: '🎉' },
};

const DEPARTMENTS = [
    'Dinas Pekerjaan Umum',
    'Dinas Lingkungan Hidup',
    'Dinas Perhubungan',
    'Dinas Kebersihan',
    'Satpol PP',
    'BPBD',
];

const MOCK_REPORTS = [
    {
        id: 'RPT-001',
        title: 'Jalan berlubang dalam di Jl. Sudirman',
        description: 'Ada lubang besar di tengah jalan yang membahayakan pengendara motor. Sudah ada beberapa motor yang jatuh. Tolong segera diperbaiki!',
        category: 'jalan',
        status: 'diproses',
        city: 'Jakarta',
        district: 'Jakarta Pusat',
        address: 'Jl. Jenderal Sudirman No. 45',
        lat: -6.2088,
        lng: 106.8456,
        upvotes: 142,
        upvotedBy: [],
        reporter: 'Budi S.',
        reporterBadge: 'Pahlawan Lingkungan',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        department: 'Dinas Pekerjaan Umum',
        photo: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=600&q=80',
        comments: [
            { user: 'Siti R.', text: 'Saya juga hampir jatuh kemarin! Tolong cepat diperbaiki.', time: '2 hari lalu' },
            { user: 'Ahmad F.', text: 'Sudah dilaporkan ke RT juga tapi belum ada tindakan.', time: '1 hari lalu' },
        ],
        timeline: [
            { status: 'dilaporkan', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diterima oleh sistem' },
            { status: 'diverifikasi', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diverifikasi oleh petugas' },
            { status: 'diproses', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: 'Dinas PU telah menugaskan tim perbaikan' },
        ],
    },
    {
        id: 'RPT-002',
        title: 'Sampah menumpuk di Kali Ciliwung',
        description: 'Tumpukan sampah plastik sangat banyak dan menghambat aliran sungai. Bau tidak sedap mengganggu warga sekitar.',
        category: 'sungai',
        status: 'diverifikasi',
        city: 'Jakarta',
        district: 'Jakarta Timur',
        address: 'Kali Ciliwung, dekat Jembatan Kampung Melayu',
        lat: -6.2217,
        lng: 106.8602,
        upvotes: 89,
        upvotedBy: [],
        reporter: 'Dewi P.',
        reporterBadge: 'Agen Perubahan',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        department: 'Dinas Lingkungan Hidup',
        photo: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&q=80',
        comments: [
            { user: 'Rudi K.', text: 'Ini sudah sangat parah, sudah lama tidak dibersihkan.', time: '4 hari lalu' },
        ],
        timeline: [
            { status: 'dilaporkan', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diterima oleh sistem' },
            { status: 'diverifikasi', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Tim lingkungan hidup telah memverifikasi' },
        ],
    },
    {
        id: 'RPT-003',
        title: 'Lampu jalan mati sepanjang 200 meter',
        description: 'Sudah 2 minggu lampu penerangan jalan mati, sangat berbahaya untuk pejalan kaki dan pengendara di malam hari.',
        category: 'lampu',
        status: 'selesai',
        city: 'Bandung',
        district: 'Bandung Utara',
        address: 'Jl. Cihampelas No. 123',
        lat: -6.8917,
        lng: 107.6098,
        upvotes: 234,
        upvotedBy: [],
        reporter: 'Hendra W.',
        reporterBadge: 'Superhero Warga',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        department: 'Dinas Perhubungan',
        photo: 'https://images.unsplash.com/photo-1558383409-b3a7a9df4293?w=600&q=80',
        comments: [],
        timeline: [
            { status: 'dilaporkan', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diterima' },
            { status: 'diverifikasi', date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), note: 'Diverifikasi oleh petugas lapangan' },
            { status: 'diproses', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), note: 'Tim teknis sedang melakukan perbaikan' },
            { status: 'selesai', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: 'Perbaikan selesai, semua lampu sudah berfungsi' },
        ],
    },
    {
        id: 'RPT-004',
        title: 'Tumpukan sampah liar di pinggir jalan',
        description: 'Ada tempat pembuangan sampah liar yang sudah menggunung dan tidak ada petugas yang membersihkan.',
        category: 'sampah',
        status: 'dilaporkan',
        city: 'Surabaya',
        district: 'Surabaya Selatan',
        address: 'Jl. Ahmad Yani Km. 5',
        lat: -7.2575,
        lng: 112.7521,
        upvotes: 45,
        upvotedBy: [],
        reporter: 'Rina M.',
        reporterBadge: 'Superhero Warga',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        department: null,
        photo: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&q=80',
        comments: [],
        timeline: [
            { status: 'dilaporkan', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diterima oleh sistem' },
        ],
    },
    {
        id: 'RPT-005',
        title: 'Banjir parah di kawasan perumahan',
        description: 'Setiap hujan deras, kawasan perumahan kami selalu banjir setinggi 50cm. Saluran drainase tersumbat dan perlu diperbaiki.',
        category: 'banjir',
        status: 'diproses',
        city: 'Semarang',
        district: 'Semarang Barat',
        address: 'Perumahan Bumi Raya Indah',
        lat: -6.9932,
        lng: 110.4203,
        upvotes: 178,
        upvotedBy: [],
        reporter: 'Agus T.',
        reporterBadge: 'Agen Perubahan',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        department: 'BPBD',
        photo: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&q=80',
        comments: [
            { user: 'Wati S.', text: 'Saya sudah 5 tahun tinggal di sini dan selalu banjir!', time: '6 hari lalu' },
            { user: 'Bambang P.', text: 'BPBD sudah datang survei kemarin.', time: '2 hari lalu' },
        ],
        timeline: [
            { status: 'dilaporkan', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diterima' },
            { status: 'diverifikasi', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), note: 'Tim BPBD melakukan survei' },
            { status: 'diproses', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Perbaikan drainase dijadwalkan' },
        ],
    },
    {
        id: 'RPT-006',
        title: 'Fasilitas taman rusak dan tidak terawat',
        description: 'Bangku taman rusak, tempat sampah hilang, dan rerumputan tidak dipotong. Taman tidak bisa digunakan warga.',
        category: 'fasilitas',
        status: 'diverifikasi',
        city: 'Medan',
        district: 'Medan Kota',
        address: 'Taman Tugu, Jl. Balai Kota',
        lat: 3.5952,
        lng: 98.6722,
        upvotes: 67,
        upvotedBy: [],
        reporter: 'Yusuf A.',
        reporterBadge: 'Superhero Warga',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        department: 'Dinas Kebersihan',
        photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        comments: [],
        timeline: [
            { status: 'dilaporkan', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diterima' },
            { status: 'diverifikasi', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: 'Petugas memverifikasi kondisi taman' },
        ],
    },
    {
        id: 'RPT-007',
        title: 'Penerangan taman kota tidak berfungsi',
        description: 'Sudah satu bulan penerangan di taman kota mati sehingga rawan kejahatan di malam hari.',
        category: 'lampu',
        status: 'dilaporkan',
        city: 'Yogyakarta',
        district: 'Kota Yogyakarta',
        address: 'Taman Pintar, Jl. Panembahan Senopati',
        lat: -7.8014,
        lng: 110.3648,
        upvotes: 33,
        upvotedBy: [],
        reporter: 'Sri W.',
        reporterBadge: 'Superhero Warga',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        department: null,
        photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
        comments: [],
        timeline: [
            { status: 'dilaporkan', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diterima' },
        ],
    },
    {
        id: 'RPT-008',
        title: 'Sungai Brantas tercemar limbah industri',
        description: 'Air sungai berubah warna menjadi hitam pekat dan berbau menyengat. Banyak ikan mati. Diduga akibat pembuangan limbah pabrik.',
        category: 'sungai',
        status: 'diproses',
        city: 'Surabaya',
        district: 'Surabaya Barat',
        address: 'Sungai Brantas, Kawasan Industri Rungkut',
        lat: -7.3305,
        lng: 112.7767,
        upvotes: 312,
        upvotedBy: [],
        reporter: 'Eko P.',
        reporterBadge: 'Pahlawan Lingkungan',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        department: 'Dinas Lingkungan Hidup',
        photo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
        comments: [
            { user: 'Hadi S.', text: 'Ini sudah terjadi berulang kali! Harus ada tindakan tegas!', time: '5 hari lalu' },
            { user: 'Lina F.', text: 'Sudah ada tim yang turun ke lapangan kemarin.', time: '1 hari lalu' },
        ],
        timeline: [
            { status: 'dilaporkan', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), note: 'Laporan diterima' },
            { status: 'diverifikasi', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), note: 'Tim investigasi diturunkan' },
            { status: 'diproses', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: 'Penyelidikan sumber pencemaran sedang berlangsung' },
        ],
    },
];

const APP_STATS = {
    totalReports: 12847,
    resolved: 8934,
    cities: 34,
    volunteers: 45230,
    avgResponseTime: 4.2, // days
};

const LEADERBOARD = [
    { name: 'Budi Santoso', city: 'Jakarta', reports: 89, badge: 'Penjaga Kota', points: 4450 },
    { name: 'Siti Rahayu', city: 'Surabaya', reports: 76, badge: 'Penjaga Kota', points: 3800 },
    { name: 'Ahmad Fauzi', city: 'Bandung', reports: 65, badge: 'Agen Perubahan', points: 3250 },
    { name: 'Dewi Putri', city: 'Medan', reports: 54, badge: 'Agen Perubahan', points: 2700 },
    { name: 'Eko Prasetyo', city: 'Semarang', reports: 48, badge: 'Pahlawan Lingkungan', points: 2400 },
];

const ACHIEVEMENTS = [
    { id: 'first', icon: '🌟', name: 'Superhero Warga', desc: 'Laporan pertama berhasil dikirim', points: 50 },
    { id: 'upvote10', icon: '🔥', name: 'Pahlawan Lingkungan', desc: '10 laporan mendapat upvote komunitas', points: 200 },
    { id: 'resolved', icon: '🏅', name: 'Agen Perubahan', desc: '1 laporan berhasil diselesaikan pemerintah', points: 500 },
    { id: 'reports50', icon: '👑', name: 'Penjaga Kota', desc: '50 laporan telah dikirimkan', points: 2500 },
];

// Utility functions
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

// LocalStorage helpers
function saveReports(reports) { localStorage.setItem('laporan_reports', JSON.stringify(reports)); }
function loadReports() {
    const stored = localStorage.getItem('laporan_reports');
    return stored ? JSON.parse(stored) : MOCK_REPORTS;
}
function initData() {
    // For prototype purposes, always refresh with latest mock data
    saveReports(MOCK_REPORTS);
}
