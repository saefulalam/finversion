# FinVersion — Blueprint Sistem Version Control untuk Spreadsheet Finance

> Dokumen ini adalah blueprint teknis dan produk lengkap. Ditulis dalam format terstruktur agar mudah diparse oleh AI coding assistant (Claude Code, Cursor, dsb) maupun dibaca manusia. Setiap section berdiri sendiri dengan konteks penuh.

## Ringkasan Eksekutif

| Atribut | Nilai |
|---|---|
| Nama kerja | FinVersion (placeholder, ganti sesuai brand) |
| Kategori | Developer tool / FinTech — spreadsheet version control |
| Analogi | "GitHub untuk model finansial" |
| Target pengguna | Finance analyst, FP&A team, startup finance lead, SME/UMKM |
| Model bisnis | Open-core (grid + formula engine open source, version control engine berbayar) |
| Estimasi effort | 9–12 bulan kerja solo developer, tanpa deadline ketat |
| Masalah inti yang diselesaikan | Spreadsheet sprawl, tidak ada audit trail, tidak ada branching untuk skenario, merge manual yang error-prone |

## 1. Latar Belakang & Masalah

Finance professional dan data analyst masih sangat bergantung pada spreadsheet manual. Riset menunjukkan mayoritas profesional finance menganggap proses manual di spreadsheet sebagai pain point signifikan dalam budgeting dan forecasting, dan sebagian besar melaporkan input data manual menyebabkan error kritis seperti formula rusak atau masalah version control.

Masalah spesifik yang berulang:

1. **Tidak ada riwayat perubahan yang jelas** — file bernama `Budget_FINAL_v3_revisi_beneran.xlsx` adalah gejala klasik.
2. **Tidak ada cara aman untuk eksperimen skenario** — user duplikat seluruh file untuk tes skenario optimis/pesimis, lalu lupa mana yang final.
3. **Tidak ada audit trail untuk compliance** — siapa mengubah angka apa, kapan, dan kenapa, sering tidak terlacak.
4. **Merge manual rawan konflik** — dua orang edit versi berbeda, salah satu perubahan hilang tanpa disadari.

## 2. Positioning terhadap Kompetitor

| Kompetitor | Pendekatan | Kenapa ada celah |
|---|---|---|
| xltrail | Git-based version control untuk file Excel | Fokus developer, UI tidak ramah finance profesional non-teknis |
| Cube, Runway, Causal, Mosaic | Platform FP&A lengkap, menggantikan spreadsheet | Harga USD 500–5000/bulan, mengharuskan migrasi total |
| SheetCompare, XLTools | Diff/compare manual, revision tracking dasar | Tidak ada commit/branch/merge sungguhan |
| Google Sheets / Excel native | Version history bawaan | Tidak ada dokumentasi perubahan, tidak bisa merge dua copy berbeda |

**Celah pasar:** solusi yang (a) tetap terasa seperti spreadsheet native, bukan platform baru yang harus dipelajari, (b) punya branching dan merge sungguhan di level sel, (c) harga terjangkau untuk SME/startup kecil, bukan hanya enterprise.

## 3. Prinsip Desain Produk

1. **Familiar dulu, powerful kemudian** — pengalaman dasar harus terasa seperti Excel/Google Sheets. Fitur version control adalah lapisan tambahan, bukan penggantian total.
2. **Non-teknis harus paham tanpa training** — istilah seperti "commit", "branch", "merge" diterjemahkan ke bahasa yang familiar bagi finance profesional (contoh: "skenario" bukan "branch", "simpan checkpoint" bukan "commit").
3. **Audit trail adalah warga kelas satu**, bukan fitur tambahan — setiap perubahan harus punya jejak siapa/kapan/kenapa sejak hari pertama arsitektur dirancang.
4. **Commodity di-open-source, keunggulan kompetitif tetap proprietary.**

## 4. Bahasa Desain Visual — Apple-Style Minimalism

Filosofi visual mengikuti prinsip desain ala Apple: tenang, fungsional, tanpa dekorasi berlebihan. Elemen visual hanya hadir kalau punya fungsi.

### 4.1 Prinsip Inti

- **Whitespace generous** — jangan padatkan UI. Beri ruang bernapas di sekitar elemen penting.
- **Hierarki lewat tipografi, bukan warna** — gunakan ukuran dan berat font untuk membedakan pentingnya elemen, bukan warna-warni.
- **Flat, tanpa gradient/shadow dekoratif** — permukaan datar, shadow hanya untuk elevasi fungsional (modal, dropdown).
- **Satu aksen warna dominan** — semua elemen netral (abu-abu, putih, hitam), satu warna aksen (biru/hijau gelap) dipakai konsisten untuk CTA dan status aktif.
- **Motion halus dan bermakna** — transisi 150–250ms, easing natural, tidak ada animasi yang sekadar dekoratif.
- **Konten dulu, chrome kemudian** — UI tools (sidebar, toolbar) selalu kalah prioritas visual dibanding data spreadsheet itu sendiri.

### 4.2 Token Desain

```
Warna:
  --bg-primary: #FFFFFF (light) / #1C1C1E (dark)
  --bg-secondary: #F5F5F7 (light) / #2C2C2E (dark)
  --text-primary: #1D1D1F (light) / #F5F5F7 (dark)
  --text-secondary: #6E6E73 (light) / #98989D (dark)
  --accent: #0071E3 (biru khas Apple)
  --success: #34C759
  --warning: #FF9F0A
  --danger: #FF3B30
  --border: rgba(0,0,0,0.08) (light) / rgba(255,255,255,0.1) (dark)

Tipografi:
  --font-family: -apple-system, "SF Pro Display", "Inter", sans-serif
  --text-xs: 12px
  --text-sm: 13px
  --text-base: 15px
  --text-lg: 20px
  --text-xl: 28px
  --font-weight-regular: 400
  --font-weight-medium: 500
  --font-weight-semibold: 600

Radius & Spacing:
  --radius-sm: 6px
  --radius-md: 10px
  --radius-lg: 16px
  --spacing-unit: 8px (kelipatan 8 untuk semua padding/margin)

Shadow (hanya untuk elevasi fungsional):
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08)
  --shadow-modal: 0 20px 40px rgba(0,0,0,0.15)
```

### 4.3 Komponen UI Kunci

| Komponen | Perilaku |
|---|---|
| Sidebar riwayat versi | Panel kanan, collapsible, timeline vertikal dengan titik penanda tiap checkpoint |
| Cell highlight perubahan | Border tipis warna aksen di sekitar sel yang berubah, fade out setelah beberapa detik |
| Diff viewer | Split view — nilai lama (strikethrough abu-abu) vs nilai baru (teks aksen), tanpa tabel berat |
| Branch/skenario switcher | Dropdown minimal di toolbar atas, bukan sidebar terpisah |
| Conflict resolution modal | Modal terpusat, dua kolom (versi A vs versi B), tombol pilih besar dan jelas |

## 5. Arsitektur Sistem

Sistem terdiri dari 4 lapisan utama, dari atas ke bawah:

```
┌─────────────────────────────────────────┐
│  UI LAYER                                │
│  Grid rendering, input, seleksi sel      │
└───────────────────┬───────────────────────┘
                    │
┌───────────────────▼───────────────────────┐
│  FORMULA ENGINE                          │
│  Parsing dan kalkulasi formula           │
└───────────────────┬───────────────────────┘
                    │
┌───────────────────▼───────────────────────┐
│  VERSION CONTROL ENGINE                  │
│  Command log, branch, merge              │
│  (Nilai jual utama produk)               │
└───────────────────┬───────────────────────┘
                    │
┌───────────────────▼───────────────────────┐
│  STORAGE LAYER                           │
│  Command log + checkpoint snapshot       │
└─────────────────────────────────────────────┘
```

## 6. Breakdown Komponen & Tech Stack

### 6.1 UI Layer (Open Source)

| Aspek | Detail |
|---|---|
| Tanggung jawab | Render grid, tangani input keyboard/mouse, seleksi sel, formatting |
| Library dasar | Univer atau x-spreadsheet (React-based) sebagai fondasi, di-extend untuk kebutuhan custom |
| Framework | React 18+, TypeScript |
| State management | Zustand atau Jotai (ringan, cocok untuk state grid yang sering berubah) |
| Styling | CSS variables custom (lihat Section 4.2), tidak pakai UI library berat seperti Material UI agar kontrol visual penuh |

### 6.2 Formula Engine (Open Source)

| Aspek | Detail |
|---|---|
| Tanggung jawab | Parsing formula (SUM, VLOOKUP, referensi antar sel), dependency graph, kalkulasi ulang otomatis |
| Library | HyperFormula (MIT license, 400+ fungsi Excel-compatible) |
| Integrasi | Wrapper custom yang menghubungkan HyperFormula dengan cell_id stabil (lihat Section 7.1), bukan koordinat A1 murni |

### 6.3 Version Control Engine (Proprietary — Closed Source)

| Aspek | Detail |
|---|---|
| Tanggung jawab | Command log, checkpoint, branching, conflict detection, merge |
| Bahasa | TypeScript (Node.js runtime) |
| Pola desain | Event sourcing — setiap perubahan adalah event yang disimpan, state adalah hasil replay event |
| Alternatif dievaluasi | Yjs (CRDT library) untuk conflict-free merging otomatis, dievaluasi sebagai pengganti sebagian logic conflict detection manual di fase lanjut |

### 6.4 Storage Layer (Proprietary)

| Aspek | Detail |
|---|---|
| Database utama | PostgreSQL — command log cocok sebagai tabel relasional dengan index di `cell_id` dan `branch_id` |
| Caching | Redis untuk state sheet yang sedang aktif diedit (mengurangi replay command log berulang) |
| File storage | S3-compatible object storage untuk checkpoint snapshot besar |

### 6.5 Backend API

| Aspek | Detail |
|---|---|
| Framework | Node.js dengan Fastify atau NestJS |
| Realtime | WebSocket (Socket.io) untuk sinkronisasi multi-user, opsional Yjs untuk collaborative editing |
| Auth | JWT + OAuth (Google Workspace login untuk memudahkan target user SME) |

## 7. Model Data & Logika Inti

### 7.1 Cell Identity

Setiap sel memiliki UUID internal yang stabil, terpisah dari koordinat tampilan (A1, B2, dst). Ini krusial karena insert/delete baris atau kolom akan mengubah koordinat tampilan tapi tidak boleh merusak rujukan histori.

```json
{
  "cell_uuid": "c_9f2a1b3e",
  "sheet_id": "sheet_main",
  "display_ref": "B2",
  "row_index": 1,
  "col_index": 1
}
```

### 7.2 Command Log Schema

Setiap perubahan disimpan sebagai objek command, bukan snapshot penuh:

```json
{
  "command_id": "cmd_8f3a2b",
  "parent_command_id": "cmd_7e219c",
  "branch_id": "main",
  "timestamp": 1720684800,
  "user_id": "user_rina",
  "cell_uuid": "c_9f2a1b3e",
  "operation": "update_value",
  "old_value": 45000000,
  "new_value": 48000000,
  "formula": null
}
```

Jenis operasi yang didukung: `update_value`, `update_formula`, `insert_row`, `delete_row`, `insert_column`, `delete_column`, `format_change`.

### 7.3 Checkpoint Strategy

Snapshot penuh diambil tiap 50–100 command sebagai titik pijak, agar rebuild state di titik waktu tertentu tidak perlu replay ribuan command dari awal.

```
Checkpoint_0 (state penuh)
  → cmd_1 → cmd_2 → ... → cmd_50
    → Checkpoint_50 (state penuh)
      → cmd_51 → cmd_52 → ...
```

### 7.4 Branching (Skenario)

Branch adalah cabang dari command log pada titik tertentu. Struktur data:

```json
{
  "branch_id": "branch_optimis_q3",
  "parent_branch_id": "main",
  "fork_point_command_id": "cmd_7e219c",
  "created_by": "user_andi",
  "created_at": 1720684800
}
```

Setiap command baru di branch ini mereferensikan `branch_id` tersebut, sehingga command di `main` tidak terpengaruh.

### 7.5 Alur Logika Merge & Conflict Detection

Langkah-langkah proses merge dua branch:

1. Temukan **common ancestor** (fork point) antara branch A dan branch B.
2. Ambil semua command di kedua branch sejak fork point.
3. Kelompokkan command berdasarkan `cell_uuid`.
4. Untuk tiap `cell_uuid` yang muncul di kedua branch:
   - Jika `new_value` akhir sama → auto-merge, tidak ada konflik.
   - Jika `new_value` akhir berbeda → **konflik**, tampilkan ke user: nilai asli (ancestor), versi A, versi B.
5. Untuk `cell_uuid` yang hanya berubah di satu branch → auto-merge tanpa perlu campur tangan user (setara fast-forward di Git).
6. User menyelesaikan setiap konflik lewat modal resolusi (pilih A, pilih B, atau input manual).
7. Hasil merge dicatat sebagai command baru bertipe `merge_commit` dengan referensi ke kedua parent command.

**Catatan penting soal formula:** command log menyimpan formula (misal `=A1+B1`), bukan hasil kalkulasi akhir. Ini penting karena jika A1 diubah di branch A dan B1 diubah di branch B sementara formula C3 tidak diubah di kedua branch, sistem otomatis konsisten tanpa dianggap konflik — karena yang dibandingkan adalah command pada `cell_uuid` yang benar-benar diubah, bukan hasil akhir kalkulasi.

## 8. Daftar Fitur Lengkap

### 8.1 Fitur Inti (MVP — Fase 1 & 2)

- [ ] Grid editor dasar dengan dukungan formula (via HyperFormula)
- [ ] Auto-checkpoint tiap interval waktu/jumlah perubahan
- [ ] Timeline riwayat versi (sidebar)
- [ ] Highlight visual sel yang baru berubah
- [ ] Restore ke versi sebelumnya (1 klik)
- [ ] Diff viewer sederhana (nilai lama vs baru)
- [ ] Autentikasi user dasar (email + Google login)

### 8.2 Fitur Lanjutan (Fase 3)

- [ ] Branching / "skenario" — buat cabang eksperimen tanpa mengubah versi utama
- [ ] Conflict detection saat merge
- [ ] Modal resolusi konflik (pilih A/B/manual)
- [ ] Comment per sel (mirip review code di pull request)
- [ ] Approval flow — reviewer harus setujui sebelum merge ke branch utama

### 8.3 Fitur Kolaborasi & Enterprise (Fase 4, berbayar)

- [ ] Real-time collaborative editing (multi-user, cursor terlihat)
- [ ] Audit log lengkap untuk compliance (siapa-apa-kapan-kenapa)
- [ ] Role-based access control (viewer, editor, approver)
- [ ] Export ke Excel/PDF dengan histori terlampir
- [ ] Integrasi API ke ERP/akuntansi (opsional, kebutuhan enterprise)

## 9. Roadmap & Estimasi Waktu

| Fase | Fokus | Estimasi |
|---|---|---|
| Fase 1 | Fondasi — integrasi grid + formula engine, UI dasar | 2–3 bulan |
| Fase 2 | Version control sederhana — command log, timeline, restore | 2–3 bulan |
| Fase 3 | Branching & merge — deteksi konflik, UI resolusi | 3–4 bulan |
| Fase 4 | Kolaborasi real-time & polish enterprise | 2+ bulan |

**Rekomendasi validasi:** rilis ke user nyata setelah Fase 2 selesai, sebelum investasi waktu besar ke Fase 3 (branching adalah fitur paling kompleks — validasi dulu apakah user benar-benar butuh sebelum dibangun penuh).

## 10. Strategi Open Source — Model Open-Core

### 10.1 Pembagian Repo

| Repo | Visibilitas | Isi | Lisensi |
|---|---|---|---|
| `finversion-core` | Publik (bisa star/fork) | UI layer + formula engine wrapper | MIT |
| `finversion-engine` | Privat | Version control engine (command log, branch, merge, conflict detection) | Proprietary |
| `finversion-cloud` | Privat | Backend API, storage layer, billing, auth | Proprietary |

### 10.2 Kenapa Open-Core, Bukan Full Open Source

- Grid editor dan formula engine adalah **commodity** — sudah banyak versi open source serupa (Univer, x-spreadsheet sendiri open source), jadi membuka bagian ini tidak menghilangkan keunggulan kompetitif.
- Version control engine adalah **nilai jual utama** — inilah yang membedakan produk ini dari Excel/Sheets biasa. Kalau dibuka penuh, siapa pun bisa fork dan jual duluan sebelum sempat monetisasi.
- Pola ini terbukti di banyak startup dev tools (GitLab, Cal.com, Sentry) — komunitas dapat manfaat dari bagian fondasi, revenue tetap terlindungi di bagian inti.

### 10.3 Pertimbangan Lisensi

| Lisensi | Kapan dipakai | Alasan |
|---|---|---|
| MIT | Repo `finversion-core` | Permisif, memudahkan adopsi dan kontribusi komunitas tanpa friksi |
| AGPL-3.0 | Alternatif untuk `finversion-core` jika ingin proteksi lebih | Mewajibkan siapa pun yang menjalankan versi modifikasi sebagai layanan cloud untuk membuka source mereka juga — mencegah cloud provider besar "mengambil" produk open source tanpa kontribusi balik |
| Proprietary (custom EULA) | `finversion-engine`, `finversion-cloud` | Melindungi kode inti yang jadi model bisnis |

**Rekomendasi:** mulai dengan MIT untuk `finversion-core` agar adopsi maksimal di awal. Evaluasi migrasi ke AGPL jika di kemudian hari ada indikasi provider besar menjalankan ulang produk sebagai layanan kompetitor tanpa kontribusi balik.

### 10.4 Repo Publik — Kriteria "Siap Rilis"

Sebelum membuka repo ke publik untuk star/fork, pastikan:

- [ ] README dengan quickstart yang benar-benar berjalan (`git clone` → jalan dalam 5 menit)
- [ ] Lisensi jelas tercantum di root repo
- [ ] `CONTRIBUTING.md` dengan panduan kontribusi
- [ ] CI dasar (test otomatis jalan di tiap PR)
- [ ] Tidak ada API key, secret, atau referensi ke `finversion-engine`/`finversion-cloud` yang privat

## 11. Metrik Validasi (Sebelum Lanjut ke Fase Berikutnya)

| Metrik | Target Fase 2 sebelum lanjut Fase 3 |
|---|---|
| User aktif mingguan | Minimal 20–30 user nyata (bukan teman/keluarga) |
| Retensi minggu ke-4 | Minimal 30% masih pakai |
| Permintaan fitur branching | Muncul organik dari user tanpa ditanya duluan |
| Willingness to pay | Minimal beberapa user bersedia bayar versi berbayar sederhana |

## 12. Glossary (untuk Konsistensi Istilah di Kode & UI)

| Istilah teknis (kode) | Istilah UI (user-facing) |
|---|---|
| Commit / Command | Checkpoint |
| Branch | Skenario |
| Merge | Gabungkan skenario |
| Conflict | Perbedaan yang perlu dipilih |
| Rollback | Kembalikan ke versi ini |
| Cell UUID | (tidak ditampilkan ke user, internal saja) |

---

*Dokumen ini adalah living document — update seiring keputusan arsitektur berubah selama pengembangan.*
