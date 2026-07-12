# Berkontribusi ke FinVersion Core

Terima kasih sudah tertarik berkontribusi. Repo ini (`finversion-core`) berisi bagian open source dari FinVersion: UI layer (grid editor) dan wrapper formula engine. Bagian version control engine (command log, branching, merge) ada di repo terpisah yang bersifat privat — lihat [Struktur Proyek](#struktur-proyek) di bawah.

## Sebelum Mulai

Baca dulu [`BLUEPRINT.md`](./BLUEPRINT.md) di root repo untuk memahami arsitektur, prinsip desain, dan alasan di balik keputusan teknis tertentu. Ini membantu kontribusi kamu selaras dengan arah proyek.

## Struktur Proyek

```
finversion-core/        (repo ini, publik, MIT license)
├── src/
│   ├── ui/              # Grid rendering, seleksi sel, input
│   ├── formula/          # Wrapper di atas HyperFormula
│   └── shared/           # Tipe data & utilitas bersama
├── BLUEPRINT.md
├── CONTRIBUTING.md      # Dokumen ini
└── LICENSE

finversion-engine/       (repo terpisah, privat)
finversion-cloud/        (repo terpisah, privat)
```

Kontribusi publik hanya berlaku untuk `finversion-core`. Jangan submit PR yang mencoba menambahkan logika command log, branching, atau merge ke repo ini — bagian itu sengaja tetap privat sebagai model bisnis (lihat Section 10 di BLUEPRINT.md).

## Cara Mulai (Quickstart)

```bash
git clone https://fineversion.com/finversion/finversion-core.git
cd finversion-core
npm install
npm run dev
```

Aplikasi seharusnya jalan di `http://localhost:3000` dalam waktu kurang dari 5 menit. Kalau tidak, itu bug — silakan buka issue.

## Jenis Kontribusi yang Diterima

- Perbaikan bug di grid rendering atau formula wrapper
- Peningkatan performa (rendering grid besar, kalkulasi formula)
- Penambahan dukungan fungsi formula baru (via HyperFormula)
- Perbaikan aksesibilitas (keyboard navigation, screen reader)
- Perbaikan dokumentasi
- Test coverage yang belum ada

## Yang Sebaiknya Didiskusikan Dulu Lewat Issue

- Perubahan besar pada struktur `cell_uuid` atau skema data inti
- Penambahan dependency baru
- Perubahan API publik yang breaking

Buka issue dulu sebelum mulai coding untuk perubahan besar, supaya tidak ada kerja yang sia-sia kalau arahnya ternyata tidak sesuai.

## Alur Kontribusi

1. Fork repo ini
2. Buat branch baru: `git checkout -b fix/nama-perbaikan` atau `feat/nama-fitur`
3. Tulis kode beserta test yang relevan
4. Pastikan `npm run test` dan `npm run lint` lolos tanpa error
5. Commit dengan pesan jelas (lihat [Format Commit](#format-commit) di bawah)
6. Push ke fork kamu, buka Pull Request ke branch `main`
7. Isi template PR — jelaskan apa yang berubah dan kenapa

## Format Commit

Gunakan format singkat dan jelas, awali dengan tipe perubahan:

```
fix: perbaiki cell reference bergeser saat insert baris
feat: tambah dukungan fungsi XLOOKUP
docs: perbarui contoh quickstart di README
perf: kurangi re-render saat scroll grid besar
test: tambah test untuk formula circular reference
```

## Standar Kode

- TypeScript strict mode — tidak ada `any` tanpa alasan jelas dan komentar penjelasan
- Format otomatis via Prettier, jalankan `npm run format` sebelum commit
- Komponen UI mengikuti token desain di `BLUEPRINT.md` Section 4 — jangan hardcode warna/spacing di luar token yang sudah ada
- Setiap fungsi publik butuh minimal satu test

## Review Process

- PR akan direview dalam waktu 3-5 hari kerja
- Maintainer bisa minta perubahan sebelum merge — ini bagian normal dari proses, bukan penolakan
- PR yang tidak ada aktivitas lebih dari 30 hari setelah review boleh ditutup otomatis, bisa dibuka ulang kalau dilanjutkan

## Melaporkan Bug

Gunakan template issue "Bug report" dan sertakan:

- Langkah reproduksi yang jelas
- Perilaku yang diharapkan vs yang terjadi
- Screenshot/recording kalau relevan (terutama untuk bug rendering)
- Versi browser dan OS

## Mengusulkan Fitur

Gunakan template issue "Feature request". Jelaskan masalah yang ingin diselesaikan, bukan cuma solusi yang diinginkan — ini membantu diskusi menemukan pendekatan terbaik, yang kadang berbeda dari usulan awal.

## Kode Etik

Bersikap sopan dan konstruktif. Kritik ditujukan ke kode, bukan ke orang. Perilaku yang mengganggu atau tidak menghormati kontributor lain tidak ditoleransi dan bisa berujung pemblokiran dari repo.

## Pertanyaan?

Buka [Discussion](https://fineversion.com/finversion/finversion-core/discussions) untuk pertanyaan umum, atau issue untuk hal spesifik terkait kode.
