# UI Component Dictionary — Full Edition

> Dokumen lengkap semua komponen UI Library mengikuti template dari `rule.md`.
> Total: **207 komponen** + **8 komponen CSS tambahan** = **215 komponen**

---

# Ringkasan

| Kategori | Jumlah | Status CSS |
|----------|-------:|:----------:|
| Layout | 12 | 3/12 |
| Typography | 10 | 1/10 |
| Form | 24 | 10/24 |
| Date & Time | 12 | 1/12 |
| Navigation | 14 | 7/14 |
| Feedback | 15 | 6/15 |
| Overlay | 12 | 7/12 |
| Data Display | 22 | 8/22 |
| Charts & Visualization | 10 | 1/10 |
| Media | 8 | 1/8 |
| Utility | 18 | 5/18 |
| Authentication | 10 | 0/10 |
| E-Commerce | 10 | 1/10 |
| Dashboard | 10 | 0/10 |
| AI Components | 10 | 0/10 |
| Mobile Components | 10 | 0/10 |
| **CSS Tambahan** | **8** | **8/8** |
| **Total** | **215** | **61/215** |

---

# 1. Layout (12 komponen)

## 1.1 Container

**Kategori:** Layout

**Fungsi:** Pembungkus halaman yang membatasi lebar konten dan memberikan padding horizontal secara konsisten.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Max-width 1200px, auto margin |
| narrow | Max-width 800px |
| wide | Max-width 1440px |
| full | 100% width, no max |

**Sizes:**

| Size | Max Width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1440px |

**States:** Default

**Props:**

| Props | Type | Default |
|-------|------|---------|
| size | string | lg |
| centered | boolean | true |
| padding | string | auto |

**Accessibility:**
- Gunakan `<div>` atau `<main>` sebagai wrapper
- Pastikan konten tetap readable di semua viewport

**Design Token:**
```
--container-max: 1200px
--container-padding: 24px
```

**Contoh:**
```html
<div class="fv-container">
  <h1>Halaman</h1>
</div>
```

**Best Practice:**
- Gunakan container untuk semua halaman
- Kombinasikan dengan Stack/Grid untuk layout internal

**Anti Pattern:**
- ❌ Jangan gunakan max-width hardcoded tanpa token
- ❌ Jangan memberikan padding manual di setiap halaman

---

## 1.2 Section

**Kategori:** Layout

**Fungsi:** Membuat section/pembagian visual dalam halaman dengan spacing yang konsisten.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Dengan border-bottom |
| divided | Dengan separator antar section |
| flush | Tanpa padding |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| id | string | - |
| divided | boolean | false |
| padding | string | lg |

**Design Token:**
```
--section-padding: 48px 0
--section-gap: 32px
```

**Contoh:**
```html
<section class="fv-section">
  <h2>Judul Section</h2>
  <p>Konten section</p>
</section>
```

---

## 1.3 Stack

**Kategori:** Layout

**Fungsi:** Layout vertikal dengan gap yang konsisten antar child elements.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Gap 16px |
| tight | Gap 8px |
| loose | Gap 24px |

**Sizes:**

| Size | Gap |
|------|-----|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| gap | number/string | md |
| align | string | stretch |
| divider | ReactNode | - |

**Design Token:**
```
--stack-gap: 16px
```

**Contoh:**
```html
<div class="fv-stack fv-stack--md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## 1.4 HStack

**Kategori:** Layout

**Fungsi:** Layout horizontal (flex row) dengan gap yang konsisten.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| gap | number/string | md |
| align | string | center |
| justify | string | start |
| wrap | boolean | false |

**Contoh:**
```html
<div class="fv-hstack fv-hstack--md">
  <button>Save</button>
  <button>Cancel</button>
</div>
```

---

## 1.5 VStack

**Kategori:** Layout

**Fungsi:** Alias untuk Stack (layout vertikal). Memastikan konsistensi naming.

**Props:** Sama dengan Stack.

---

## 1.6 Grid

**Kategori:** Layout

**Fungsi:** Layout grid responsif dengan column count yang konsisten.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| 2 | 2 kolom |
| 3 | 3 kolom |
| 4 | 4 kolom |
| auto | Auto-fill berdasarkan min-width |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| columns | number/string | auto |
| gap | number/string | md |
| minItemWidth | string | 250px |

**Design Token:**
```
--grid-gap: 16px
--grid-min-width: 250px
```

**Contoh:**
```html
<div class="fv-grid fv-grid--3" style="gap:16px;">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

---

## 1.7 Flex

**Kategori:** Layout

**Fungsi:** Wrapper fleksibel untuk layout custom dengan props yang mudah.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| direction | string | row |
| align | string | center |
| justify | string | start |
| wrap | boolean | false |
| gap | number/string | 0 |

---

## 1.8 Spacer

**Kategori:** Layout

**Fungsi:** Memberikan jarak vertikal atau horizontal yang fleksibel (flex: 1).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| size | number/string | - |
| direction | string | vertical |

**Contoh:**
```html
<div class="fv-hstack">
  <span>Kiri</span>
  <div class="fv-spacer"></div>
  <span>Kanan</span>
</div>
```

---

## 1.9 Divider

**Kategori:** Layout

**Fungsi:** Garis pemisah antar section atau content.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| horizontal | Garis horizontal (default) |
| vertical | Garis vertikal |
| dashed | Garis putus-putus |
| thick | Garis tebal |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| orientation | string | horizontal |
| variant | string | solid |
| label | string | - |

**Design Token:**
```
--divider-color: var(--border-outer)
--divider-width: 1px
```

**Contoh:**
```html
<div class="fv-separator"></div>
<div class="fv-separator fv-separator--vertical"></div>
```

---

## 1.10 Aspect Ratio

**Kategori:** Layout

**Fungsi:** Menjaga rasio aspek konten (16:9, 4:3, 1:1, dll).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| ratio | string | 16/9 |

**Contoh:**
```html
<div class="fv-aspect-ratio" style="aspect-ratio:16/9;">
  <video src="..."></video>
</div>
```

---

## 1.11 Masonry

**Kategori:** Layout

**Fungsi:** Layout masonry seperti Pinterest — item dengan tinggi bervariasi tanpa gap vertikal.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| columns | number | 3 |
| gap | number | 16 |
| minWidth | string | 250px |

**Contoh:**
```html
<div class="fv-masonry" style="columns:3;gap:16px;">
  <div class="fv-masonry__item">Tinggi 100px</div>
  <div class="fv-masonry__item">Tinggi 200px</div>
  <div class="fv-masonry__item">Tinggi 150px</div>
</div>
```

---

## 1.12 Split Pane

**Kategori:** Layout

**Fungsi:** Layout dua panel yang bisa di-resize secara horizontal atau vertikal.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| direction | string | horizontal |
| defaultSize | number/string | 50% |
| minSize | string | 200px |
| maxSize | string | 80% |
| resizable | boolean | true |

**Contoh:**
```html
<div class="fv-resizable">
  <div class="fv-resizable__panel">Panel Kiri</div>
  <div class="fv-resizable__handle"></div>
  <div class="fv-resizable__panel">Panel Kanan</div>
</div>
```

---

# 2. Typography (10 komponen)

## 2.1 Text

**Kategori:** Typography

**Fungsi:** Teks dengan style konsisten yang mendukung semua ukuran dan warna.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Body text |
| muted | Warna secondary |
| accent | Warna accent |
| success | Warna hijau |
| danger | Warna merah |

**Sizes:**

| Size | Font Size |
|------|-----------|
| xs | 12px |
| sm | 13px |
| md | 14px |
| lg | 16px |
| xl | 18px |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| size | string | md |
| variant | string | default |
| weight | string | normal |
| as | string | span |

**Design Token:**
```
--text-primary: #1a1a1a
--text-secondary: #6b7280
--text-tertiary: #9ca3af
```

---

## 2.2 Heading

**Kategori:** Typography

**Fungsi:** Judul dengan hierarchy yang jelas (h1-h4).

**Sizes:**

| Size | Font Size | Weight | Letter Spacing |
|------|-----------|--------|----------------|
| h1 | 36px | 800 | -1.5px |
| h2 | 28px | 700 | -0.5px |
| h3 | 22px | 700 | -0.3px |
| h4 | 18px | 600 | 0 |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| level | number | 2 |
| as | string | h2 |

**Contoh:**
```html
<h1 class="fv-heading fv-heading--h1">Judul Utama</h1>
<h2 class="fv-heading fv-heading--h2">Judul Section</h2>
```

---

## 2.3 Paragraph

**Kategori:** Typography

**Fungsi:** Blok teks paragraf dengan line-height dan spacing yang optimal.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| lead | Paragraf pembuka (lebih besar) |
| default | Paragraf normal |
| small | Paragraf kecil |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| variant | string | default |
| as | string | p |

---

## 2.4 Label

**Kategori:** Typography

**Fungsi:** Label untuk form fields dan UI elements.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| required | boolean | false |
| disabled | boolean | false |
| size | string | md |

**Design Token:**
```
--label-size: 13px
--label-weight: 500
--label-color: var(--text-primary)
```

---

## 2.5 Caption

**Kategori:** Typography

**Fungsi:** Teks kecil untuk keterangan, timestamp, atau metadata.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| variant | string | default |
| as | string | span |

---

## 2.6 Link

**Kategori:** Typography

**Fungsi:** Teks hyperlink dengan style konsisten.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Underline on hover |
| always | Selalu underline |
| ghost | Tanpa underline |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| href | string | - |
| variant | string | default |
| external | boolean | false |

---

## 2.7 Code

**Kategori:** Typography

**Fungsi:** Teks inline code dengan background dan border yang konsisten.

**Contoh:**
```html
Gunakan <code class="fv-code">npm install</code> untuk menginstal.
```

---

## 2.8 Blockquote

**Kategori:** Typography

**Fungsi:** Kutipan dengan border-left dan indentasi.

**Contoh:**
```html
<blockquote class="fv-blockquote">
  <p>"Desain adalah bukan hanya apa yang terlihat, tapi juga apa yang dirasakan."</p>
</blockquote>
```

---

## 2.9 List

**Kategori:** Typography

**Fungsi:** Daftar item dengan numbering atau bullet points.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| ordered | Numbered list |
| unordered | Bullet list |
| check | Dengan ikon check |
| icon | Dengan custom icon |

**Contoh:**
```html
<ul class="fv-list">
  <li class="fv-list__item">Item 1</li>
  <li class="fv-list__item">Item 2</li>
</ul>
```

---

## 2.10 Markdown

**Kategori:** Typography

**Fungsi:** Renderer Markdown content dengan styling konsisten.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| content | string | - |
| components | object | - |

---

# 3. Form Components (24 komponen)

## 3.1 Button

**Kategori:** Form

**Fungsi:** Tombol untuk menjalankan aksi.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| primary | Tombol utama |
| secondary | Tombol kedua |
| outline | Border saja |
| ghost | Transparan |
| destructive | Hapus/bahaya |
| link | Seperti hyperlink |

**Sizes:**

| Size | Height | Padding |
|------|--------|---------|
| xs | 28px | 6px 10px |
| sm | 32px | 8px 14px |
| md | 40px | 10px 18px |
| lg | 48px | 12px 24px |
| xl | 56px | 14px 28px |

**States:** Default, Hover, Active, Focus, Loading, Disabled

**Props:**

| Props | Type | Default |
|-------|------|---------|
| variant | string | primary |
| size | string | md |
| disabled | boolean | false |
| loading | boolean | false |
| icon | ReactNode | - |
| children | ReactNode | wajib |

**Accessibility:**
- focus-visible ring
- keyboard navigation (Enter/Space)
- aria-label jika icon only
- disabled menggunakan atribut HTML

**Design Token:**
```
--btn-primary-bg: var(--accent-gradient)
--btn-primary-color: #fff
--btn-radius: var(--radius-md)
```

**Contoh:**
```html
<button class="fv-btn fv-btn--primary">Save</button>
<button class="fv-btn fv-btn--secondary">Cancel</button>
<button class="fv-btn fv-btn--primary fv-btn--sm"><i class="bi bi-plus"></i> Tambah</button>
```

**Best Practice:**
- Gunakan Primary hanya satu kali per section
- Gunakan Secondary untuk aksi tambahan
- Gunakan Destructive untuk aksi tidak dapat dibatalkan

**Anti Pattern:**
- ❌ Jangan lebih dari dua tombol Primary per section
- ❌ Jangan membuat ukuran custom

---

## 3.2 Icon Button

**Kategori:** Form

**Fungsi:** Tombol yang hanya berisi icon, tanpa teks.

**Variants:** Sama dengan Button.

**Sizes:**

| Size | Dimensions |
|------|-----------|
| xs | 28x28px |
| sm | 32x32px |
| md | 40x40px |
| lg | 48x48px |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| icon | ReactNode | wajib |
| aria-label | string | wajib |
| variant | string | ghost |

**Accessibility:**
- aria-label WAJIB untuk screen reader

**Contoh:**
```html
<button class="fv-btn fv-btn--icon" aria-label="Hapus">
  <i class="bi bi-trash"></i>
</button>
```

---

## 3.3 Toggle Button

**Kategori:** Form

**Fungsi:** Tombol yang bisa aktif/non-aktif (on/off state).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| pressed | boolean | false |
| onPressedChange | function | - |
| size | string | md |

**Contoh:**
```html
<button class="fv-toggle" aria-pressed="true">
  <i class="bi bi-bold"></i>
</button>
```

---

## 3.4 Button Group

**Kategori:** Form

**Fungsi:** Sekelompok tombol yang terhubung secara visual.

**Contoh:**
```html
<div class="fv-btn-group">
  <button class="fv-btn fv-btn--primary">Kiri</button>
  <button class="fv-btn fv-btn--primary">Tengah</button>
  <button class="fv-btn fv-btn--primary">Kanan</button>
</div>
```

---

## 3.5 Input

**Kategori:** Form

**Fungsi:** Input teks untuk mengambil data dari user.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Input standar |
| filled | Dengan background |
| flushed | Tanpa border |
| underlined | Border bawah saja |

**Sizes:**

| Size | Height | Font Size |
|------|--------|-----------|
| sm | 32px | 13px |
| md | 40px | 14px |
| lg | 48px | 16px |

**States:** Default, Focus, Error, Disabled, ReadOnly

**Props:**

| Props | Type | Default |
|-------|------|---------|
| type | string | text |
| placeholder | string | - |
| value | string | - |
| disabled | boolean | false |
| error | boolean | false |
| size | string | md |

**Accessibility:**
- Label terhubung via `htmlFor`/`id`
- aria-invalid untuk error state
- aria-describedby untuk helper text

**Design Token:**
```
--input-bg: var(--bg-item)
--input-border: var(--border-outer)
--input-radius: var(--radius-md)
--input-height: 40px
```

**Contoh:**
```html
<label class="fv-label" for="name">Nama</label>
<input class="fv-input" id="name" placeholder="Masukkan nama">
```

---

## 3.6 Password Input

**Kategori:** Form

**Fungsi:** Input password dengan toggle show/hide.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| showToggle | boolean | true |
| (semua props Input) | - | - |

**Contoh:**
```html
<div class="fv-input-group">
  <input class="fv-input" type="password" placeholder="Password">
  <button class="fv-input-group__btn" aria-label="Toggle password">
    <i class="bi bi-eye"></i>
  </button>
</div>
```

---

## 3.7 Search Input

**Kategori:** Form

**Fungsi:** Input pencarian dengan ikon search dan clear button.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| showClear | boolean | true |
| onSearch | function | - |
| (semua props Input) | - | - |

**Contoh:**
```html
<div class="fv-input-group">
  <i class="bi bi-search fv-input-group__icon"></i>
  <input class="fv-input" placeholder="Cari...">
</div>
```

---

## 3.8 Number Input

**Kategori:** Form

**Fungsi:** Input angka dengan increment/decrement buttons.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| min | number | - |
| max | number | - |
| step | number | 1 |
| value | number | 0 |

**Contoh:**
```html
<div class="fv-ns-wrap">
  <button class="fv-ns-trigger">−</button>
  <input class="fv-input fv-ns-input" type="number" value="1">
  <button class="fv-ns-trigger">+</button>
</div>
```

---

## 3.9 Currency Input

**Kategori:** Form

**Fungsi:** Input mata uang dengan format otomatis (Rp, $, €).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| currency | string | IDR |
| locale | string | id-ID |
| precision | number | 0 |

---

## 3.10 OTP Input

**Kategori:** Form

**Fungsi:** Input One-Time Password dengan multiple boxes.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| length | number | 6 |
| type | string | number |

**Contoh:**
```html
<div class="fv-otp">
  <input class="fv-otp__field" maxlength="1">
  <input class="fv-otp__field" maxlength="1">
  <input class="fv-otp__field" maxlength="1">
  <input class="fv-otp__field" maxlength="1">
  <input class="fv-otp__field" maxlength="1">
  <input class="fv-otp__field" maxlength="1">
</div>
```

---

## 3.11 Pin Input

**Kategori:** Form

**Fungsi:** Mirip OTP, tapi untuk PIN/secure code.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| length | number | 4 |
| mask | boolean | false |

---

## 3.12 Textarea

**Kategori:** Form

**Fungsi:** Input teks multi-baris.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| rows | number | 4 |
| maxLength | number | - |
| autoResize | boolean | false |
| (semua props Input) | - | - |

**Contoh:**
```html
<textarea class="fv-input" rows="4" placeholder="Tulis pesan..."></textarea>
```

---

## 3.13 Select

**Kategori:** Form

**Fungsi:** Dropdown select untuk memilih satu opsi.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Select standar |
| native | Menggunakan `<select>` HTML |
| custom | Custom dropdown |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| options | SelectOption[] | wajib |
| value | string | - |
| placeholder | string | Pilih... |
| disabled | boolean | false |

**Contoh:**
```html
<select class="fv-input fv-select">
  <option value="">Pilih...</option>
  <option value="1">Opsi 1</option>
</select>
```

---

## 3.14 Multi Select

**Kategori:** Form

**Fungsi:** Select yang membolehkan multiple selections dengan tags/chips.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| options | SelectOption[] | wajib |
| value | string[] | [] |
| maxSelected | number | - |
| searchable | boolean | true |

---

## 3.15 Combobox

**Kategori:** Form

**Fungsi:** Input dengan dropdown suggestions yang bisa dicari.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| options | SelectOption[] | wajib |
| searchable | boolean | true |
| creatable | boolean | false |

**Contoh:**
```html
<div class="fv-combobox">
  <input class="fv-combobox__search" placeholder="Cari...">
  <div class="fv-combobox__dropdown">
    <div class="fv-combobox__option">Opsi 1</div>
    <div class="fv-combobox__option">Opsi 2</div>
  </div>
</div>
```

---

## 3.16 Autocomplete

**Kategori:** Form

**Fungsi:** Input dengan suggestions otomatis berdasarkan typing.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| suggestions | string[] | [] |
| onSelect | function | - |
| debounce | number | 300 |

**Contoh:**
```html
<div class="fv-autocomplete">
  <input class="fv-input" placeholder="Ketik untuk mencari...">
  <div class="fv-autocomplete__dropdown">
    <div class="fv-autocomplete__item">Hasil 1</div>
  </div>
</div>
```

---

## 3.17 Checkbox

**Kategori:** Form

**Fungsi:** Checkbox untuk single/multiple boolean selection.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| checked | boolean | false |
| disabled | boolean | false |
| indeterminate | boolean | false |

**Contoh:**
```html
<label class="fv-checkbox">
  <input type="checkbox" checked>
  <div class="fv-checkbox__box"></div>
  <span class="fv-checkbox__label">Label</span>
</label>
```

---

## 3.18 Checkbox Group

**Kategori:** Form

**Fungsi:** Sekelompok checkbox dengan shared state.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | string[] | [] |
| onChange | function | - |
| orientation | string | vertical |

---

## 3.19 Radio

**Kategori:** Form

**Fungsi:** Radio button untuk single selection dari beberapa opsi.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| checked | boolean | false |
| disabled | boolean | false |
| value | string | - |

**Contoh:**
```html
<label class="fv-radio">
  <input type="radio" name="option" value="1">
  <div class="fv-radio__circle"></div>
  <span class="fv-radio__label">Opsi 1</span>
</label>
```

---

## 3.20 Radio Group

**Kategori:** Form

**Fungsi:** Sekelompok radio buttons dengan shared state.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | string | - |
| onChange | function | - |
| orientation | string | vertical |

**Contoh:**
```html
<div class="fv-radio-group">
  <label class="fv-radio">
    <input type="radio" name="opt" value="1" checked>
    <div class="fv-radio__circle"></div>
    <span class="fv-radio__label">Opsi 1</span>
  </label>
  <label class="fv-radio">
    <input type="radio" name="opt" value="2">
    <div class="fv-radio__circle"></div>
    <span class="fv-radio__label">Opsi 2</span>
  </label>
</div>
```

---

## 3.21 Switch

**Kategori:** Form

**Fungsi:** Toggle switch untuk on/off state.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| checked | boolean | false |
| disabled | boolean | false |
| size | string | md |

**Contoh:**
```html
<label class="fv-switch">
  <input type="checkbox" checked>
  <div class="fv-switch__track">
    <div class="fv-switch__thumb"></div>
  </div>
</label>
```

---

## 3.22 Slider

**Kategori:** Form

**Fungsi:** Slider untuk memilih nilai dalam range.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| min | number | 0 |
| max | number | 100 |
| step | number | 1 |
| value | number | 50 |
| disabled | boolean | false |

**Contoh:**
```html
<input type="range" class="fv-slider" min="0" max="100" value="50">
```

---

## 3.23 Range Slider

**Kategori:** Form

**Fungsi:** Slider dengan dua thumb untuk memilih range (min-max).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| min | number | 0 |
| max | number | 100 |
| value | [number, number] | [25, 75] |
| step | number | 1 |

---

## 3.24 Color Picker

**Kategori:** Form

**Fungsi:** Picker untuk memilih warna dengan palette dan input hex/rgb.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | string | #000000 |
| format | string | hex |
| presets | string[] | [] |

---

# 4. Date & Time (12 komponen)

## 4.1 Date Picker

**Kategori:** Date & Time

**Fungsi:** Picker untuk memilih tanggal.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| single | Satu tanggal |
| range | Rentang tanggal |
| multiple | Beberapa tanggal |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | Date | - |
| min | Date | - |
| max | Date | - |
| format | string | dd/MM/yyyy |

**Contoh:**
```html
<div class="fv-picker">
  <input class="fv-input" placeholder="Pilih tanggal">
  <div class="fv-picker__calendar">
    <div class="fv-picker__grid">
      <div class="fv-picker-day">1</div>
      <div class="fv-picker-day">2</div>
    </div>
  </div>
</div>
```

---

## 4.2 Date Range Picker

**Kategori:** Date & Time

**Fungsi:** Picker untuk memilih rentang tanggal (start - end).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| startDate | Date | - |
| endDate | Date | - |

---

## 4.3 Time Picker

**Kategori:** Date & Time

**Fungsi:** Picker untuk memilih waktu (jam:menit).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | string | - |
| format | string | HH:mm |
| minuteStep | number | 5 |

---

## 4.4 DateTime Picker

**Kategori:** Date & Time

**Fungsi:** Kombinasi date dan time picker.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | Date | - |
| format | string | dd/MM/yyyy HH:mm |

---

## 4.5 Calendar

**Kategori:** Date & Time

**Fungsi:** Tampilan kalender penuh untuk date navigation.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| month | Date | new Date() |
| selected | Date | - |
| events | Date[] | [] |

**Contoh:**
```html
<div class="fv-picker">
  <div class="fv-picker__head">
    <button class="fv-picker__nav">‹</button>
    <span class="fv-picker__month">Juli 2026</span>
    <button class="fv-picker__nav">›</button>
  </div>
  <div class="fv-picker__grid">
    <div class="fv-picker-day">1</div>
    ...
  </div>
</div>
```

---

## 4.6 Month Picker

**Kategori:** Date & Time

**Fungsi:** Picker untuk memilih bulan.

---

## 4.7 Year Picker

**Kategori:** Date & Time

**Fungsi:** Picker untuk memilih tahun.

---

## 4.8 Week Picker

**Kategori:** Date & Time

**Fungsi:** Picker untuk memilih minggu dalam tahun.

---

## 4.9 Time Range Picker

**Kategori:** Date & Time

**Fungsi:** Picker untuk memilih rentang waktu.

---

## 4.10 Countdown

**Kategori:** Date & Time

**Fungsi:** Timer mundur ke target waktu tertentu.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| target | Date | wajib |
| onComplete | function | - |
| format | string | HH:mm:ss |

**Contoh:**
```html
<div class="fv-countdown">
  <span class="fv-countdown__value">02</span>:
  <span class="fv-countdown__value">15</span>:
  <span class="fv-countdown__value">30</span>
</div>
```

---

## 4.11 Timer

**Kategori:** Date & Time

**Fungsi:** Stopwatch/duration timer yang bisa start/stop/reset.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| autoStart | boolean | false |
| format | string | mm:ss |

---

## 4.12 Clock

**Kategori:** Date & Time

**Fungsi:** Tampilan jam analog/digital.

---

# 5. Navigation (14 komponen)

## 5.1 Navbar

**Kategori:** Navigation

**Fungsi:** Navigasi utama di bagian atas halaman.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| static | Fixed position |
| sticky | Sticky on scroll |
| floating | Floating dengan shadow |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| brand | ReactNode | - |
| children | ReactNode | wajib |

**Contoh:**
```html
<nav class="fv-navbar">
  <div class="fv-navbar__brand">Logo</div>
  <div class="fv-navbar__links">
    <a href="#" class="fv-nav__link active">Beranda</a>
    <a href="#" class="fv-nav__link">Produk</a>
  </div>
</nav>
```

---

## 5.2 Sidebar

**Kategori:** Navigation

**Fungsi:** Navigasi samping untuk aplikasi dengan banyak menu.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Full sidebar |
| compact | Icon-only sidebar |
| collapsible | Bisa di-collapse |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | SidebarItem[] | wajib |
| collapsed | boolean | false |
| onCollapse | function | - |

**Contoh:**
```html
<aside class="fv-sidebar">
  <div class="fv-sidebar__header">Logo</div>
  <nav class="fv-sidebar__content">
    <a class="fv-sidebar__item active" href="#">
      <i class="bi bi-house"></i> Beranda
    </a>
    <a class="fv-sidebar__item" href="#">
      <i class="bi bi-gear"></i> Pengaturan
    </a>
  </nav>
</aside>
```

---

## 5.3 Topbar

**Kategori:** Navigation

**Fungsi:** Bar di bagian atas konten (bukan navbar utama).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| title | string | - |
| actions | ReactNode | - |

---

## 5.4 Bottom Navigation

**Kategori:** Navigation

**Fungsi:** Navigasi di bagian bawah untuk mobile apps.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | NavItem[] | wajib |
| active | string | - |

**Contoh:**
```html
<nav class="fv-bottom-nav">
  <a class="fv-bottom-nav__item active" href="#">
    <i class="bi bi-house"></i>
    <span>Beranda</span>
  </a>
  <a class="fv-bottom-nav__item" href="#">
    <i class="bi bi-search"></i>
    <span>Cari</span>
  </a>
</nav>
```

---

## 5.5 Tabs

**Kategori:** Navigation

**Fungsi:** Tab navigation untuk switch konten.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Underline tabs |
| pills | Pill-style tabs |
| enclosed | Boxed tabs |
| soft | Soft background tabs |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | TabItem[] | wajib |
| value | string | - |
| onChange | function | - |

**Contoh:**
```html
<div class="fv-tabs">
  <button class="fv-tab active" data-fv-tab="tab1">Tab 1</button>
  <button class="fv-tab" data-fv-tab="tab2">Tab 2</button>
</div>
<div class="fv-tab-panel active" data-fv-panel="tab1">Konten 1</div>
<div class="fv-tab-panel" data-fv-panel="tab2">Konten 2</div>
```

---

## 5.6 Breadcrumb

**Kategori:** Navigation

**Fungsi:** Navigasi hierarki (Home > Produk > Detail).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | BreadcrumbItem[] | wajib |
| separator | ReactNode | / |

**Contoh:**
```html
<nav class="fv-breadcrumb">
  <a class="fv-breadcrumb__item" href="#">Beranda</a>
  <span class="fv-breadcrumb__sep">/</span>
  <a class="fv-breadcrumb__item" href="#">Produk</a>
  <span class="fv-breadcrumb__sep">/</span>
  <span class="fv-breadcrumb__item active">Detail</span>
</nav>
```

---

## 5.7 Pagination

**Kategori:** Navigation

**Fungsi:** Navigasi halaman untuk data panjang.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Numbered |
| simple | Prev/Next only |
| compact | Dots style |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| total | number | wajib |
| current | number | 1 |
| pageSize | number | 10 |

**Contoh:**
```html
<div class="fv-pagination">
  <button class="fv-pagination__item">‹</button>
  <button class="fv-pagination__item active">1</button>
  <button class="fv-pagination__item">2</button>
  <button class="fv-pagination__item">3</button>
  <button class="fv-pagination__item">›</button>
</div>
```

---

## 5.8 Menu

**Kategori:** Navigation

**Fungsi:** Menu dropdown dengan items.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | MenuItem[] | wajib |
| trigger | ReactNode | - |

---

## 5.9 Dropdown Menu

**Kategori:** Navigation

**Fungsi:** Menu dropdown yang muncul dari trigger button.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | DropdownItem[] | wajib |
| align | string | start |

**Contoh:**
```html
<div class="fv-dropdown">
  <button class="fv-dropdown__trigger fv-btn">Menu</button>
  <div class="fv-dropdown__menu">
    <a class="fv-dropdown__item" href="#">Profil</a>
    <a class="fv-dropdown__item" href="#">Pengaturan</a>
    <div class="fv-separator"></div>
    <a class="fv-dropdown__item" href="#">Keluar</a>
  </div>
</div>
```

---

## 5.10 Mega Menu

**Kategori:** Navigation

**Fungsi:** Menu dropdown lebar dengan multi-column layout.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| columns | MegaMenuColumn[] | wajib |
| width | string | 800px |

---

## 5.11 Context Menu

**Kategori:** Navigation

**Fungsi:** Menu yang muncul saat right-click.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | MenuItem[] | wajib |

**Contoh:**
```html
<div class="fv-context-menu" id="ctx1">
  <div class="fv-context-menu__item">
    <i class="bi bi-pencil"></i> Edit
  </div>
  <div class="fv-context-menu__item">
    <i class="bi bi-trash"></i> Hapus
  </div>
</div>
```

---

## 5.12 Command Menu

**Kategori:** Navigation

**Fungsi:** Command palette seperti Spotlight/Alfred — search + keyboard navigation.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| onOpenChange | function | - |

**Contoh:**
```html
<div class="fv-command">
  <div class="fv-command__input-wrap">
    <i class="bi bi-search"></i>
    <input class="fv-command__input" placeholder="Type a command...">
  </div>
  <div class="fv-command__list">
    <div class="fv-command__item">
      <i class="bi bi-search"></i> Search
      <span class="fv-command__item-shortcut">⌘K</span>
    </div>
  </div>
</div>
```

---

## 5.13 Stepper

**Kategori:** Navigation

**Fungsi:** Step-by-step wizard navigation.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| horizontal | Step horizontal |
| vertical | Step vertikal |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| steps | StepItem[] | wajib |
| current | number | 0 |

**Contoh:**
```html
<div class="fv-stepper">
  <div class="fv-stepper__step completed">
    <div class="fv-stepper__circle"><i class="bi bi-check-lg"></i></div>
    <span class="fv-stepper__label">Data Diri</span>
  </div>
  <div class="fv-stepper__line"></div>
  <div class="fv-stepper__step active">
    <div class="fv-stepper__circle">2</div>
    <span class="fv-stepper__label">Pembayaran</span>
  </div>
</div>
```

---

## 5.14 Tree View

**Kategori:** Navigation

**Fungsi:** Hierarki data seperti file explorer.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | TreeNode[] | wajib |
| defaultExpandAll | boolean | false |

**Contoh:**
```html
<div class="fv-tree">
  <div class="fv-tree__item open">
    <div class="fv-tree__toggle" onclick="this.parentElement.classList.toggle('open')">
      <i class="bi bi-chevron-right"></i>
    </div>
    <i class="bi bi-folder2"></i>
    <span>src</span>
    <div class="fv-tree__children">
      <div class="fv-tree__leaf">
        <i class="bi bi-filetype-ts"></i> index.ts
      </div>
    </div>
  </div>
</div>
```

---

# 6. Feedback (15 komponen)

## 6.1 Alert

**Kategori:** Feedback

**Fungsi:** Notifikasi inline untuk informasi, success, warning, atau error.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| info | Informasi |
| success | Berhasil |
| warning | Peringatan |
| error | Error |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| variant | string | info |
| title | string | - |
| closable | boolean | false |
| icon | ReactNode | - |

**Contoh:**
```html
<div class="fv-alert fv-alert--info">
  <i class="bi bi-info-circle"></i>
  <div>
    <div class="fv-alert__title">Info</div>
    <div class="fv-alert__desc">Ini adalah informasi penting.</div>
  </div>
  <button class="fv-alert__close"><i class="bi bi-x"></i></button>
</div>
```

---

## 6.2 Alert Dialog

**Kategori:** Feedback

**Fungsi:** Dialog konfirmasi untuk aksi kritis (delete, logout).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| title | string | wajib |
| description | string | - |
| confirmText | string | OK |
| cancelText | string | Batal |
| onConfirm | function | - |
| onCancel | function | - |

---

## 6.3 Toast

**Kategori:** Feedback

**Fungsi:** Notifikasi popup sementara di corner layar.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| info | Informasi |
| success | Berhasil |
| warning | Peringatan |
| error | Error |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| message | string | wajib |
| type | string | info |
| duration | number | 3000 |

**Contoh:**
```javascript
FV.toast('Berhasil disimpan!', 'success');
```

---

## 6.4 Snackbar

**Kategori:** Feedback

**Fungsi:** Notifikasi di bottom layar dengan action button.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| message | string | wajib |
| action | { label, onClick } | - |
| duration | number | 5000 |

---

## 6.5 Notification

**Kategori:** Feedback

**Fungsi:** Notifikasi yang persisten sampai di-dismiss.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| title | string | wajib |
| description | string | - |
| icon | ReactNode | - |

---

## 6.6 Progress

**Kategori:** Feedback

**Fungsi:** Progress bar untuk menunjukkan completion status.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Linear |
| striped | Dengan stripe pattern |
| animated | Dengan animasi |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | number | 0 |
| max | number | 100 |
| variant | string | default |

**Contoh:**
```html
<div class="fv-progress">
  <div class="fv-progress__bar" style="width:60%;"></div>
</div>
```

---

## 6.7 Circular Progress

**Kategori:** Feedback

**Fungsi:** Progress indicator berbentuk lingkaran.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | number | 0 |
| size | number | 40 |
| strokeWidth | number | 4 |

---

## 6.8 Spinner

**Kategori:** Feedback

**Fungsi:** Loading indicator berbentuk spinning circle.

**Sizes:**

| Size | Dimensions |
|------|-----------|
| sm | 16px |
| md | 24px |
| lg | 32px |
| xl | 48px |

**Contoh:**
```html
<div class="fv-spinner"></div>
<div class="fv-spinner fv-spinner--lg"></div>
```

---

## 6.9 Skeleton

**Kategori:** Feedback

**Fungsi:** Placeholder loading untuk content yang belum load.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| text | Garis teks |
| circle | Lingkaran |
| rectangle | Kotak |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| width | string | 100% |
| height | string | 20px |
| variant | string | text |

**Contoh:**
```html
<div class="fv-skeleton fv-skeleton--text" style="width:80%;"></div>
<div class="fv-skeleton fv-skeleton--text" style="width:60%;"></div>
<div class="fv-skeleton fv-skeleton--circle" style="width:48px;height:48px;"></div>
```

---

## 6.10 Loading Overlay

**Kategori:** Feedback

**Fungsi:** Overlay transparan dengan spinner untuk loading state.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| loading | boolean | false |
| text | string | Memuat... |

---

## 6.11 Empty State

**Kategori:** Feedback

**Fungsi:** Tampilan ketika tidak ada data.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| icon | ReactNode | - |
| title | string | - |
| description | string | - |
| action | ReactNode | - |

**Contoh:**
```html
<div class="fv-empty">
  <div class="fv-empty__icon"><i class="bi bi-inbox"></i></div>
  <div class="fv-empty__text">Belum ada data</div>
</div>
```

---

## 6.12 Result

**Kategori:** Feedback

**Fungsi:** Halaman hasil (success, error, 404, dll).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| status | string | success |
| title | string | - |
| extra | ReactNode | - |

---

## 6.13 Status Badge

**Kategori:** Feedback

**Fungsi:** Badge yang menunjukkan status (online, offline, busy).

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| online | Hijau |
| offline | Abu-abu |
| busy | Merah |
| away | Kuning |

**Contoh:**
```html
<span class="fv-badge fv-badge--success">
  <span class="fv-badge__dot"></span> Online
</span>
```

---

## 6.14 Error Boundary

**Kategori:** Feedback

**Fungsi:** Catch JavaScript errors di React component tree.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| fallback | ReactNode | - |
| onError | function | - |

---

## 6.15 Offline Indicator

**Kategori:** Feedback

**Fungsi:** Menunjukkan status koneksi internet.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| message | string | Anda sedang offline |

---

# 7. Overlay (12 komponen)

## 7.1 Modal

**Kategori:** Overlay

**Fungsi:** Dialog overlay untuk konten penting.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| onClose | function | - |
| size | string | md |

**Contoh:**
```html
<div class="fv-modal active">
  <div class="fv-modal__overlay"></div>
  <div class="fv-modal__content">
    <div class="fv-modal__head">
      <h3>Judul</h3>
      <button class="fv-modal__close"><i class="bi bi-x"></i></button>
    </div>
    <div class="fv-modal__body">Konten modal</div>
    <div class="fv-modal__foot">
      <button class="fv-btn fv-btn--secondary">Batal</button>
      <button class="fv-btn fv-btn--primary">Simpan</button>
    </div>
  </div>
</div>
```

---

## 7.2 Dialog

**Kategori:** Overlay

**Fungsi:** Alias untuk Modal (konsisten dengan shadcn/ui).

---

## 7.3 Drawer

**Kategori:** Overlay

**Fungsi:** Panel yang slide dari sisi (left/right/top/bottom).

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| left | Dari kiri |
| right | Dari kanan |
| top | Dari atas |
| bottom | Dari bawah |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| side | string | right |
| onClose | function | - |

**Contoh:**
```html
<div class="fv-drawer active">
  <div class="fv-drawer__overlay"></div>
  <div class="fv-drawer__content">
    <div class="fv-drawer__head">
      <h3>Judul</h3>
      <button class="fv-drawer__close"><i class="bi bi-x"></i></button>
    </div>
    <div class="fv-drawer__body">Konten</div>
  </div>
</div>
```

---

## 7.4 Sheet

**Kategori:** Overlay

**Fungsi:** Panel overlay yang lebih ringan dari drawer.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| side | string | right |

**Contoh:**
```html
<div class="fv-sheet active">
  <div class="fv-sheet__overlay"></div>
  <div class="fv-sheet__content">
    <div class="fv-sheet__head">Judul</div>
    <div class="fv-sheet__body">Konten</div>
  </div>
</div>
```

---

## 7.5 Popover

**Kategori:** Overlay

**Fungsi:** Panel konten yang muncul dari trigger element.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| align | string | center |

**Contoh:**
```html
<div class="fv-popover" id="pop1">
  <button class="fv-btn" onclick="togglePopover('pop1')">Buka</button>
  <div class="fv-popover__content">
    <div class="fv-popover__title">Judul</div>
    <div class="fv-popover__desc">Deskripsi popover</div>
  </div>
</div>
```

---

## 7.6 Tooltip

**Kategori:** Overlay

**Fungsi:** Teks bantuan yang muncul saat hover.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| content | string | wajib |
| side | string | top |

**Contoh:**
```html
<button class="fv-tooltip" data-fv-tooltip="Ini tooltip">Hover me</button>
```

---

## 7.7 Hover Card

**Kategori:** Overlay

**Fungsi:** Card yang muncul saat hover (untuk preview user/profile).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |

**Contoh:**
```html
<div class="fv-hover-card">
  <span class="fv-hover-card__trigger fv-badge fv-badge--accent">@user</span>
  <div class="fv-hover-card__content">
    <div class="fv-hover-card__name">Nama User</div>
    <div class="fv-hover-card__desc">Deskripsi</div>
  </div>
</div>
```

---

## 7.8 Context Popup

**Kategori:** Overlay

**Fungsi:** Popup yang muncul dari context menu (right-click).

---

## 7.9 Confirm Dialog

**Kategori:** Overlay

**Fungsi:** Dialog konfirmasi khusus untuk aksi destructif.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| title | string | wajib |
| description | string | - |
| confirmText | string | Hapus |
| variant | string | destructive |

---

## 7.10 Action Sheet

**Kategori:** Overlay

**Fungsi:** Panel aksi dari bawah (mobile-first).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| actions | ActionItem[] | wajib |

---

## 7.11 Lightbox

**Kategori:** Overlay

**Fungsi:** Fullscreen image viewer.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| images | string[] | wajib |
| currentIndex | number | 0 |

---

## 7.12 Tour

**Kategori:** Overlay

**Fungsi:** Step-by-step product tour/onboarding.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| steps | TourStep[] | wajib |
| active | boolean | false |

---

# 8. Data Display (22 komponen)

## 8.1 Card

**Kategori:** Data Display

**Fungsi:** Container konten dengan border dan shadow.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Card standar |
| outlined | Border saja, tanpa shadow |
| elevated | Dengan shadow besar |
| interactive | Hover effect |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| variant | string | default |
| padding | string | md |

**Contoh:**
```html
<div class="fv-card">
  <div class="fv-card__head">Judul</div>
  <div class="fv-card__body">Konten</div>
</div>
```

---

## 8.2 Avatar

**Kategori:** Data Display

**Fungsi:** Representasi user (foto atau inisial).

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| image | Dengan gambar |
| initials | Dengan inisial |
| icon | Dengan icon |

**Sizes:**

| Size | Dimensions |
|------|-----------|
| xs | 24px |
| sm | 32px |
| md | 40px |
| lg | 56px |
| xl | 72px |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| src | string | - |
| alt | string | - |
| size | string | md |
| fallback | string | - |

**Contoh:**
```html
<div class="fv-avatar fv-avatar--md" style="background:var(--accent-gradient);color:#fff;">AK</div>
```

---

## 8.3 Avatar Group

**Kategori:** Data Display

**Fungsi:** Sekelompok avatar yang overlapping.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| max | number | 3 |
| children | ReactNode | wajib |

---

## 8.4 Badge

**Kategori:** Data Display

**Fungsi:** Label kecil untuk status atau count.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Background default |
| accent | Warna accent |
| success | Hijau |
| warning | Kuning |
| danger | Merah |
| outline | Border saja |

**Sizes:**

| Size | Font Size | Padding |
|------|-----------|---------|
| sm | 10px | 2px 6px |
| md | 12px | 3px 10px |
| lg | 13px | 4px 12px |

**Contoh:**
```html
<span class="fv-badge fv-badge--accent">12</span>
<span class="fv-badge fv-badge--success">Active</span>
```

---

## 8.5 Chip

**Kategori:** Data Display

**Fungsi:** Badge yang bisa di-dismiss (dengan close button).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| closable | boolean | false |
| onClose | function | - |

---

## 8.6 Tag

**Kategori:** Data Display

**Fungsi:** Label untuk kategori/metadata.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| solid | Background solid |
| soft | Background transparan |
| outline | Border saja |

---

## 8.7 Table

**Kategori:** Data Display

**Fungsi:** Tabel data dengan sorting, selection, dan styling.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| default | Tabel standar |
| striped | Baris bergantian |
| compact | Padding lebih kecil |

**Props:**

| Props | Type | Default |
|-------|------|---------|
| striped | boolean | false |
| hoverable | boolean | true |
| compact | boolean | false |

**Contoh:**
```html
<table class="fv-table">
  <thead>
    <tr><th>Nama</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Andi</td><td><span class="fv-badge fv-badge--success">Active</span></td></tr>
  </tbody>
</table>
```

---

## 8.8 Data Grid

**Kategori:** Data Display

**Fungsi:** Tabel data advanced dengan fitur: sorting, filtering, pagination, column resize.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| columns | ColumnDef[] | wajib |
| data | any[] | wajib |
| sortable | boolean | true |
| filterable | boolean | false |
| paginated | boolean | true |

---

## 8.9 List

**Kategori:** Data Display

**Fungsi:** Daftar items dengan styling konsisten.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | ListItem[] | wajib |
| divided | boolean | true |

---

## 8.10 Description List

**Kategori:** Data Display

**Fungsi:** Daftar key-value pairs (definition list).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | { label, value }[] | wajib |

**Contoh:**
```html
<dl class="fv-dlist">
  <dt>Nama</dt><dd>Andi</dd>
  <dt>Email</dt><dd>andi@example.com</dd>
</dl>
```

---

## 8.11 Accordion

**Kategori:** Data Display

**Fungsi:** Collapsible sections untuk content panjang.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | AccordionItem[] | wajib |
| collapsible | boolean | true |

**Contoh:**
```html
<div class="fv-accordion">
  <div class="fv-accordion__item open">
    <button class="fv-accordion__trigger" onclick="toggleAccordion(this)">
      <span>Section 1</span>
      <i class="bi bi-chevron-down"></i>
    </button>
    <div class="fv-accordion__content">Konten 1</div>
  </div>
</div>
```

---

## 8.12 Collapse

**Kategori:** Data Display

**Fungsi:** Wrapper untuk collapsible content (tanpa accordion styling).

---

## 8.13 Timeline

**Kategori:** Data Display

**Fungsi:** Urutan events/activities secara chronologis.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | TimelineItem[] | wajib |
| variant | string | default |

**Contoh:**
```html
<ul class="fv-timeline-list">
  <li class="fv-timeline-item">
    <div class="fv-timeline-dot"></div>
    <div>
      <div class="fv-timeline-item__title">Event 1</div>
      <div class="fv-timeline-item__desc">Deskripsi</div>
    </div>
  </li>
</ul>
```

---

## 8.14 Statistic

**Kategori:** Data Display

**Fungsi:** Tampilan angka statistik dengan label.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| title | string | - |
| value | string/number | wajib |
| prefix | string | - |
| suffix | string | - |

---

## 8.15 Metric Card

**Kategori:** Data Display

**Fungsi:** Card khusus untuk menampilkan metric/KPI.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| title | string | wajib |
| value | string | wajib |
| change | number | - |
| icon | ReactNode | - |

---

## 8.16 KPI Card

**Kategori:** Data Display

**Fungsi:** Card KPI dengan trend indicator dan sparkline.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| title | string | wajib |
| value | string | wajib |
| target | number | - |
| trend | number | - |

---

## 8.17 Tree

**Kategori:** Data Display

**Fungsi:** Hierarki data dengan expand/collapse.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| data | TreeNode[] | wajib |
| selectable | boolean | false |

---

## 8.18 JSON Viewer

**Kategori:** Data Display

**Fungsi:** Tampilan JSON yang formatted dan collapsible.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| data | object | wajib |
| collapsible | boolean | true |

---

## 8.19 Key Value

**Kategori:** Data Display

**Fungsi:** Tampilan pasangan key-value sederhana.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | { key, value }[] | wajib |
| orientation | string | horizontal |

---

## 8.20 Property List

**Kategori:** Data Display

**Fungsi:** Daftar properti dengan label dan value.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| properties | Property[] | wajib |

---

## 8.21 Code Block

**Kategori:** Data Display

**Fungsi:** Blok kode dengan syntax highlighting.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| code | string | wajib |
| language | string | - |
| showLineNumbers | boolean | false |

**Contoh:**
```html
<pre class="fv-code-block" data-lang="js">
  <code>const x = 42;</code>
</pre>
```

---

## 8.22 Diff Viewer

**Kategori:** Data Display

**Fungsi:** Tampilan perbedaan antara dua versi kode/text.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| oldValue | string | wajib |
| newValue | string | wajib |
| splitView | boolean | true |

---

# 9. Charts & Visualization (10 komponen)

## 9.1 Line Chart

**Kategori:** Charts

**Fungsi:** Grafik garis untuk trend data.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| data | ChartData | wajib |
| smooth | boolean | false |
| grid | boolean | true |

**Contoh:**
```html
<div class="fv-chart fv-chart--line">
  <svg viewBox="0 0 400 200">
    <polyline points="0,180 50,120 100,150 200,80 300,100 400,40" fill="none" stroke="var(--accent)" stroke-width="2"/>
  </svg>
</div>
```

---

## 9.2 Bar Chart

**Kategori:** Charts

**Fungsi:** Grafik batang untuk perbandingan data.

**Contoh:**
```html
<div class="fv-chart fv-chart--bar">
  <div class="fv-chart__bar" style="height:60%;background:var(--accent-gradient);"></div>
  <div class="fv-chart__bar" style="height:80%;background:var(--accent-gradient);"></div>
</div>
```

---

## 9.3 Area Chart

**Kategori:** Charts

**Fungsi:** Grafik area (line chart dengan fill).

---

## 9.4 Pie Chart

**Kategori:** Charts

**Fungsi:** Grafik pie untuk proporsi data.

---

## 9.5 Donut Chart

**Kategori:** Charts

**Fungsi:** Grafik donut (pie chart dengan hole di tengah).

**Contoh:**
```html
<div class="fv-chart fv-chart--donut">
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" stroke-width="10" stroke-dasharray="60 251.2"/>
  </svg>
</div>
```

---

## 9.6 Radar Chart

**Kategori:** Charts

**Fungsi:** Grafik radar/spider untuk multi-dimensional data.

---

## 9.7 Scatter Chart

**Kategori:** Charts

**Fungsi:** Grafik scatter untuk korelasi dua variabel.

---

## 9.8 Heatmap

**Kategori:** Charts

**Fungsi:** Visualisasi data dalam bentuk warna matrix.

---

## 9.9 Gauge

**Kategori:** Charts

**Fungsi:** Gauge meter untuk menunjukkan value dalam range.

---

## 9.10 Sparkline

**Kategori:** Charts

**Fungsi:** Grafik mini inline tanpa axes.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| data | number[] | wajib |
| color | string | var(--accent) |
| height | number | 20 |

---

# 10. Media (8 komponen)

## 10.1 Image

**Kategori:** Media

**Fungsi:** Gambar dengan lazy loading, fallback, dan aspect ratio.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| src | string | wajib |
| alt | string | - |
| fallback | string | - |
| lazy | boolean | true |

---

## 10.2 Avatar Image

**Kategori:** Media

**Fungsi:** Avatar yang menampilkan gambar dengan fallback ke inisial.

---

## 10.3 Gallery

**Kategori:** Media

**Fungsi:** Galeri gambar dengan lightbox.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| images | string[] | wajib |
| columns | number | 3 |

---

## 10.4 Carousel

**Kategori:** Media

**Fungsi:** Slider konten dengan navigasi prev/next.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| autoPlay | boolean | false |
| interval | number | 3000 |
| showDots | boolean | true |

**Contoh:**
```html
<div class="fv-carousel" id="carousel1">
  <div class="fv-carousel__track">
    <div class="fv-carousel__slide">Slide 1</div>
    <div class="fv-carousel__slide">Slide 2</div>
  </div>
  <button class="fv-carousel__btn fv-carousel__btn--prev">‹</button>
  <button class="fv-carousel__btn fv-carousel__btn--next">›</button>
  <div class="fv-carousel__dots">
    <button class="fv-carousel__dot active"></button>
    <button class="fv-carousel__dot"></button>
  </div>
</div>
```

---

## 10.5 Video Player

**Kategori:** Media

**Fungsi:** Player video dengan controls custom.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| src | string | wajib |
| poster | string | - |
| controls | boolean | true |

---

## 10.6 Audio Player

**Kategori:** Media

**Fungsi:** Player audio dengan waveform visual.

---

## 10.7 File Preview

**Kategori:** Media

**Fungsi:** Preview file (image, PDF, video) sebelum upload.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| file | File | wajib |
| removable | boolean | true |

---

## 10.8 PDF Viewer

**Kategori:** Media

**Fungsi:** Viewer PDF inline.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| url | string | wajib |
| page | number | 1 |

---

# 11. Utility (18 komponen)

## 11.1 Portal

**Kategori:** Utility

**Fungsi:** Render content di DOM node yang berbeda (biasanya document.body).

**Props:**

| Props | Type | Default |
|-------|------|---------|
| container | HTMLElement | document.body |
| children | ReactNode | wajib |

---

## 11.2 Scroll Area

**Kategori:** Utility

**Fungsi:** Custom scrollbar yang styled dan cross-browser.

**Contoh:**
```html
<div class="fv-scroll-area" style="height:300px;">
  <div class="fv-scroll-area__content">
    Konten yang bisa di-scroll...
  </div>
</div>
```

---

## 11.3 Scroll Spy

**Kategori:** Utility

**Fungsi:** Highlight nav link berdasarkan section yang sedang visible.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| target | string | - |
| offset | number | 100 |

---

## 11.4 Scroll To Top

**Kategori:** Utility

**Fungsi:** Button untuk scroll ke atas halaman.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| showAfter | number | 300 |

---

## 11.5 Resize Observer

**Kategori:** Utility

**Fungsi:** Hook/component untuk observe element size changes.

---

## 11.6 Virtual List

**Kategori:** Utility

**Fungsi:** Render ribuan items hanya yang visible di viewport.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | any[] | wajib |
| itemHeight | number | 40 |
| containerHeight | number | 400 |

---

## 11.7 Infinite Scroll

**Kategori:** Utility

**Fungsi:** Load more content saat scroll ke bawah.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| loadMore | function | wajib |
| hasMore | boolean | true |

---

## 11.8 Lazy Load

**Kategori:** Utility

**Fungsi:** Load content/images hanya saat masuk viewport.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| threshold | number | 100 |
| placeholder | ReactNode | - |

---

## 11.9 Copy Button

**Kategori:** Utility

**Fungsi:** Button untuk copy text ke clipboard.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| text | string | wajib |
| onCopy | function | - |

**Contoh:**
```html
<button class="fv-clipboard__btn" onclick="navigator.clipboard.writeText('text')">
  <i class="bi bi-clipboard"></i>
</button>
```

---

## 11.10 Clipboard

**Kategori:** Utility

**Fungsi:** Clipboard manager dengan copy/cut/paste.

---

## 11.11 Theme Switcher

**Kategori:** Utility

**Fungsi:** Toggle antara light/dark/custom theme.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| themes | string[] | ['light', 'dark'] |
| defaultTheme | string | 'light' |

---

## 11.12 Locale Switcher

**Kategori:** Utility

**Fungsi:** Switch bahasa/lokal aplikasi.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| locales | Locale[] | wajib |
| current | string | - |

---

## 11.13 Command Palette

**Kategori:** Utility

**Fungsi:** Spotlight-style search + command execution.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| open | boolean | false |
| commands | Command[] | wajib |

---

## 11.14 Keyboard Shortcut

**Kategori:** Utility

**Fungsi:** Register keyboard shortcuts global.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| shortcut | string | wajib |
| handler | function | wajib |

---

## 11.15 Focus Trap

**Kategori:** Utility

**Fungsi:** Trap keyboard focus dalam container (untuk modal/drawer).

---

## 11.16 Visually Hidden

**Kategori:** Utility

**Fungsi:** Content yang tersembunyi visual tapi tetap accessible screen reader.

**Contoh:**
```html
<span class="sr-only">Label untuk screen reader</span>
```

---

## 11.17 Slot

**Kategori:** Utility

**Fungsi:** Named slot untuk komposisi komponen.

---

## 11.18 Slot Group

**Kategori:** Utility

**Fungsi:** Group multiple slots.

---

# 12. Authentication (10 komponen)

## 12.1 Login Form

**Kategori:** Authentication

**Fungsi:** Form login dengan email/password.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| onSubmit | function | wajib |
| showForgotPassword | boolean | true |
| showRegister | boolean | true |

---

## 12.2 Register Form

**Kategori:** Authentication

**Fungsi:** Form registrasi dengan name, email, password.

---

## 12.3 Forgot Password

**Kategori:** Authentication

**Fungsi:** Form lupa password (input email).

---

## 12.4 Reset Password

**Kategori:** Authentication

**Fungsi:** Form reset password (new password + confirm).

---

## 12.5 Verify Email

**Kategori:** Authentication

**Fungsi:** Halaman verifikasi email (enter code dari email).

---

## 12.6 Two Factor Input

**Kategori:** Authentication

**Fungsi:** Input 2FA code (6 digit).

---

## 12.7 Session Timeout

**Kategori:** Authentication

**Fungsi:** Dialog peringatan session akan expired.

---

## 12.8 User Menu

**Kategori:** Authentication

**Fungsi:** Dropdown menu untuk user profile (avatar + name + actions).

---

## 12.9 Profile Card

**Kategori:** Authentication

**Fungsi:** Card tampilan profil user.

---

## 12.10 Permission Guard

**Kategori:** Authentication

**Fungsi:** Wrapper yang check permissions sebelum render children.

---

# 13. E-Commerce (10 komponen)

## 13.1 Product Card

**Kategori:** E-Commerce

**Fungsi:** Card produk dengan gambar, nama, harga, rating.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| image | string | - |
| name | string | wajib |
| price | number | wajib |
| rating | number | - |

---

## 13.2 Product Gallery

**Kategori:** E-Commerce

**Fungsi:** Gallery gambar produk dengan thumbnail navigation.

---

## 13.3 Price Tag

**Kategori:** E-Commerce

**Fungsi:** Tampilan harga dengan diskon.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| price | number | wajib |
| originalPrice | number | - |
| currency | string | IDR |

---

## 13.4 Rating

**Kategori:** E-Commerce

**Fungsi:** Star rating untuk review.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| value | number | 0 |
| max | number | 5 |
| readonly | boolean | false |

**Contoh:**
```html
<div class="fv-rating">
  <i class="fv-rating__star bi bi-star-fill"></i>
  <i class="fv-rating__star bi bi-star-fill"></i>
  <i class="fv-rating__star bi bi-star-fill"></i>
  <i class="fv-rating__star bi bi-star"></i>
  <i class="fv-rating__star bi bi-star"></i>
</div>
```

---

## 13.5 Quantity Selector

**Kategori:** E-Commerce

**Fungsi:** Input jumlah dengan +/- buttons.

---

## 13.6 Cart Item

**Kategori:** E-Commerce

**Fungsi:** Item dalam shopping cart.

---

## 13.7 Shopping Cart

**Kategori:** E-Commerce

**Fungsi:** Full shopping cart dengan list items dan total.

---

## 13.8 Checkout Stepper

**Kategori:** E-Commerce

**Fungsi:** Step-by-step checkout (Address → Payment → Confirm).

---

## 13.9 Coupon Input

**Kategori:** E-Commerce

**Fungsi:** Input kode coupon dengan validate button.

---

## 13.10 Order Timeline

**Kategori:** E-Commerce

**Fungsi:** Timeline status pesanan (Dipesan → Dikirim → Diterima).

---

# 14. Dashboard (10 komponen)

## 14.1 Dashboard Layout

**Kategori:** Dashboard

**Fungsi:** Layout standar dashboard: sidebar + topbar + content area.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| sidebar | ReactNode | - |
| topbar | ReactNode | - |
| children | ReactNode | wajib |

---

## 14.2 Analytics Card

**Kategori:** Dashboard

**Fungsi:** Card metric dengan chart mini dan trend.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| title | string | wajib |
| value | string | wajib |
| change | number | - |
| sparkline | number[] | - |

---

## 14.3 Widget

**Kategori:** Dashboard

**Fungsi:** Container fleksibel untuk dashboard widget.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| title | string | - |
| actions | ReactNode | - |
| loading | boolean | false |

---

## 14.4 Activity Feed

**Kategori:** Dashboard

**Fungsi:** Daftar aktivitas terbaru dengan timestamp.

**Props:**

| Props | Type | Default |
|-------|------|---------|
| items | ActivityItem[] | wajib |
| maxItems | number | 10 |

---

## 14.5 Recent Transactions

**Kategori:** Dashboard

**Fungsi:** Tabel transaksi terbaru dengan status.

---

## 14.6 Notification Center

**Kategori:** Dashboard

**Fungsi:** Panel notifikasi dengan mark read.

---

## 14.7 User Profile Widget

**Kategori:** Dashboard

**Fungsi:** Widget mini profil user.

---

## 14.8 Calendar Widget

**Kategori:** Dashboard

**Fungsi:** Widget kalender mini untuk dashboard.

---

## 14.9 Task Widget

**Kategori:** Dashboard

**Fungsi:** Widget daftar task dengan checkbox.

---

## 14.10 Quick Action

**Kategori:** Dashboard

**Fungsi:** Tombol aksi cepat di dashboard.

---

# 15. AI Components (10 komponen)

## 15.1 Chat Window

**Kategori:** AI

**Fungsi:** Container untuk AI chat interface.

---

## 15.2 Chat Bubble

**Kategori:** AI

**Fungsi:** Bubble pesan untuk user dan AI.

**Variants:**

| Variant | Keterangan |
|---------|-----------|
| user | Pesan dari user (kanan) |
| assistant | Pesan dari AI (kiri) |

---

## 15.3 Prompt Input

**Kategori:** AI

**Fungsi:** Input khusus untuk AI prompts (multiline + send button).

---

## 15.4 AI Response

**Kategori:** AI

**Fungsi:** Container untuk response AI dengan markdown rendering.

---

## 15.5 Code Renderer

**Kategori:** AI

**Fungsi:** Render kode dari AI response dengan syntax highlighting.

---

## 15.6 Markdown Viewer

**Kategori:** AI

**Fungsi:** Render markdown content dari AI response.

---

## 15.7 Thinking Indicator

**Kategori:** AI

**Fungsi:** Loading indicator saat AI sedang memproses.

---

## 15.8 Streaming Text

**Kategori:** AI

**Fungsi:** Text yang muncul character-by-character (streaming response).

---

## 15.9 Citation Block

**Kategori:** AI

**Fungsi:** Block untuk menampilkan sumber/citation dari AI response.

---

## 15.10 Prompt History

**Kategori:** AI

**Fungsi:** Daftar prompt sebelumnya yang bisa di-reuse.

---

# 16. Mobile Components (10 komponen)

## 16.1 Bottom Sheet

**Kategori:** Mobile

**Fungsi:** Panel dari bawah khusus mobile.

---

## 16.2 Swipe Action

**Kategori:** Mobile

**Fungsi:** Item dengan swipe actions (delete, archive).

---

## 16.3 Pull To Refresh

**Kategori:** Mobile

**Fungsi:** Pull down untuk refresh content.

---

## 16.4 Floating Action Button

**Kategori:** Mobile

**Fungsi:** Tombol aksi utama yang floating.

**Contoh:**
```html
<button class="fv-fab">
  <i class="bi bi-plus-lg"></i>
</button>
```

---

## 16.5 Mobile Tabs

**Kategori:** Mobile

**Fungsi:** Tab navigation untuk mobile (bottom tabs).

---

## 16.6 Mobile Navigation

**Kategori:** Mobile

**Fungsi:** Navigasi hamburger menu untuk mobile.

---

## 16.7 Gesture Area

**Kategori:** Mobile

**Fungsi:** Area untuk touch gestures (swipe, pinch).

---

## 16.8 Mobile Drawer

**Kategori:** Mobile

**Fungsi:** Drawer fullscreen untuk mobile.

---

## 16.9 Mobile Search

**Kategori:** Mobile

**Fungsi:** Search bar fullscreen untuk mobile.

---

## 16.10 Safe Area

**Kategori:** Mobile

**Fungsi:** Padding untuk safe area (notch, home indicator).

---

# 17. CSS Tambahan (8 komponen)

> Komponen ini sudah ada di CSS `fv-ui.css` tapi belum terdaftar di dictionary.

## 17.1 File Browser

**Kategori:** Data Display

**Fungsi:** File/folder explorer dengan tree view dan file list.

**CSS Class:** `.fv-browser`, `.fv-browser__sidebar`, `.fv-browser__file-row`

**Contoh:**
```html
<div class="fv-browser">
  <div class="fv-browser__sidebar">
    <div class="fv-browser__search-wrap">
      <i class="bi bi-search"></i>
      <input class="fv-browser__search" placeholder="Cari...">
    </div>
    <div class="fv-tree">
      <div class="fv-tree-item open">src/</div>
    </div>
  </div>
  <div class="fv-browser__content">
    <div class="fv-file-row"><i class="bi bi-filetype-ts"></i> index.ts</div>
    <div class="fv-file-row"><i class="bi bi-filetype-css"></i> styles.css</div>
  </div>
</div>
```

---

## 17.2 Checklist

**Kategori:** Form / Data Display

**Fungsi:** Daftar task dengan checkbox dan status.

**CSS Class:** `.fv-checklist`, `.fv-checklist__item`

**Contoh:**
```html
<div class="fv-checklist">
  <label class="fv-checkbox fv-checklist__item">
    <input type="checkbox" checked>
    <div class="fv-checkbox__box"></div>
    <span class="fv-checkbox__label">Selesai desain</span>
  </label>
  <label class="fv-checkbox fv-checklist__item">
    <input type="checkbox">
    <div class="fv-checkbox__box"></div>
    <span class="fv-checkbox__label">Implementasi</span>
  </label>
</div>
```

---

## 17.3 Field

**Kategori:** Form

**Fungsi:** Wrapper untuk form field (label + input + helper/error text).

**CSS Class:** `.fv-field`, `.fv-field__label`, `.fv-field__input`, `.fv-field__helper`, `.fv-field__error`

**Contoh:**
```html
<div class="fv-field">
  <label class="fv-field__label">Email</label>
  <input class="fv-input" placeholder="email@example.com">
  <span class="fv-field__helper">Kami tidak akan membagikan email Anda.</span>
</div>
```

---

## 17.4 Input Group

**Kategori:** Form

**Fungsi:** Group input dengan addon (icon, button, text) di kiri/kanan.

**CSS Class:** `.fv-input-group`, `.fv-input-group__icon`, `.fv-input-group__btn`

**Contoh:**
```html
<div class="fv-input-group">
  <i class="bi bi-envelope fv-input-group__icon"></i>
  <input class="fv-input" placeholder="Email">
</div>
<div class="fv-input-group">
  <input class="fv-input" placeholder="URL">
  <button class="fv-input-group__btn fv-btn">Go</button>
</div>
```

---

## 17.5 Message

**Kategori:** Feedback

**Fungsi:** Pesan inline untuk validasi atau info (lebih ringan dari Alert).

**CSS Class:** `.fv-message`, `.fv-message--success`, `.fv-message--error`

**Contoh:**
```html
<div class="fv-message fv-message--success">
  <i class="bi bi-check-circle"></i> Berhasil disimpan!
</div>
<div class="fv-message fv-message--error">
  <i class="bi bi-exclamation-circle"></i> Email sudah digunakan.
</div>
```

---

## 17.6 Marker

**Kategori:** Data Display

**Fungsi:** Marker/pin untuk maps atau annotation.

**CSS Class:** `.fv-marker`

**Contoh:**
```html
<div class="fv-marker" style="position:absolute;top:100px;left:200px;">
  <i class="bi bi-geo-alt-fill"></i>
</div>
```

---

## 17.7 Marquee

**Kategori:** Media / Utility

**Fungsi:** Teks/gambar yang bergerak scroll secara horizontal.

**CSS Class:** `.fv-marquee`, `.fv-marquee__content`

**Contoh:**
```html
<div class="fv-marquee">
  <div class="fv-marquee__content">
    <span>Teks bergerak tanpa henti</span>
  </div>
</div>
```

---

## 17.8 Spotlight

**Kategori:** Navigation / Utility

**Fungsi:** Search overlay dengan keyboard navigation (Cmd/Ctrl+K).

**CSS Class:** `.fv-spotlight`, `.fv-spotlight__dialog`, `.fv-spotlight__input`, `.fv-spotlight__item`

**Contoh:**
```html
<div class="fv-spotlight open">
  <div class="fv-spotlight__dialog">
    <div class="fv-spotlight__input-wrap">
      <i class="bi bi-search"></i>
      <input class="fv-spotlight__input" placeholder="Cari...">
      <span class="fv-spotlight__kbd">ESC</span>
    </div>
    <div class="fv-spotlight__results">
      <div class="fv-spotlight__item active">
        <i class="bi bi-house fv-spotlight__item-icon"></i>
        <span class="fv-spotlight__item-text">Beranda</span>
        <span class="fv-spotlight__item-hint">Halaman</span>
      </div>
    </div>
    <div class="fv-spotlight__footer">
      <span><span class="fv-spotlight__kbd">↑↓</span> Navigasi</span>
      <span><span class="fv-spotlight__kbd">↵</span> Pilih</span>
      <span><span class="fv-spotlight__kbd">ESC</span> Tutup</span>
    </div>
  </div>
</div>
```

---

# Status Implementasi CSS

| Status | Keterangan |
|--------|-----------|
| ✅ | Sudah ada CSS |
| ⏳ | Perlu dibuat |
| 📋 | Tersedia di dictionary |

## Ringkasan per Kategori

| Kategori | Total | ✅ CSS | ⏳ Perlu |
|----------|------:|-------:|---------:|
| Layout | 12 | 3 | 9 |
| Typography | 10 | 1 | 9 |
| Form | 24 | 10 | 14 |
| Date & Time | 12 | 1 | 11 |
| Navigation | 14 | 7 | 7 |
| Feedback | 15 | 6 | 9 |
| Overlay | 12 | 7 | 5 |
| Data Display | 22 | 8 | 14 |
| Charts | 10 | 1 | 9 |
| Media | 8 | 1 | 7 |
| Utility | 18 | 5 | 13 |
| Auth | 10 | 0 | 10 |
| E-Commerce | 10 | 1 | 9 |
| Dashboard | 10 | 0 | 10 |
| AI | 10 | 0 | 10 |
| Mobile | 10 | 0 | 10 |
| CSS Tambahan | 8 | 8 | 0 |
| **Total** | **215** | **61** | **154** |
