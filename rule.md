opencode -s ses_0a70d9d15ffes7dg2Nw5bVVEDO# UI Component Dictionary



> Dokumentasi standar untuk membangun dan mengelola UI Component Library.



\---



\# Tujuan



Repository ini berisi kamus komponen (Component Dictionary) yang menjadi acuan dalam pembuatan UI Library.



Setiap komponen memiliki standar:



\- Nama

\- Fungsi

\- Variasi

\- Props

\- States

\- Accessibility

\- Design Token

\- Contoh Penggunaan

\- Best Practice

\- Anti Pattern



\---



\# Struktur Folder



```

components/

│

├── button/

│   ├── README.md

│   ├── Button.tsx

│   ├── Button.test.ts

│   ├── Button.stories.tsx

│   └── examples.md

│

├── input/

├── modal/

├── card/

├── badge/

└── ...

```



\---



\# Template Dokumentasi Komponen



\## Nama



Button



\---



\## Kategori



Form



\---



\## Fungsi



Digunakan untuk menjalankan sebuah aksi.



Contoh:



\- Submit

\- Save

\- Delete

\- Login



\---



\## Variants



| Variant | Keterangan |

|----------|------------|

| primary | Tombol utama |

| secondary | Tombol kedua |

| outline | Border saja |

| ghost | Transparan |

| destructive | Hapus |

| link | Seperti hyperlink |



\---



\## Sizes



| Size | Tinggi |

|------|---------|

| xs | 28px |

| sm | 32px |

| md | 40px |

| lg | 48px |

| xl | 56px |



\---



\## States



\- Default

\- Hover

\- Active

\- Focus

\- Loading

\- Disabled



\---



\## Props



| Props | Type | Default |

|--------|------|----------|

| variant | string | primary |

| size | string | md |

| disabled | boolean | false |

| loading | boolean | false |

| icon | ReactNode | - |

| children | ReactNode | wajib |



\---



\## Accessibility



Harus memiliki:



\- focus-visible

\- keyboard navigation

\- aria-label jika icon only

\- disabled menggunakan atribut HTML



\---



\## Design Token



Background:



```

bg-primary

```



Text:



```

text-primary-foreground

```



Radius



```

rounded-md

```



Spacing



```

px-4 py-2

```



\---



\## Contoh



```tsx

<Button>Save</Button>

```



```tsx

<Button variant="outline">

Cancel

</Button>

```



```tsx

<Button loading>

Saving...

</Button>

```



\---



\## Best Practice



✅ Gunakan Primary hanya satu kali pada satu halaman.



✅ Gunakan Secondary untuk aksi tambahan.



✅ Gunakan Destructive untuk aksi yang tidak dapat dibatalkan.



\---



\## Anti Pattern



❌ Jangan menggunakan lebih dari dua tombol Primary dalam satu section.



❌ Jangan membuat ukuran custom.



❌ Jangan mengganti warna langsung menggunakan class Tailwind.



\---



\# Naming Convention



Gunakan nama yang konsisten.



\## Component



```

Button

Input

Checkbox

Dialog

Drawer

Accordion

```



\## Props



```

variant

size

color

disabled

loading

icon

```



\## Event



```

onClick

onChange

onOpenChange

onValueChange

```



\---



\# Design Token



Semua warna harus berasal dari token.



Contoh



```

primary

secondary

muted

accent

background

foreground

border

ring

destructive

success

warning

info

```



\---



\# Size Scale



```

xs

sm

md

lg

xl

2xl

```



\---



\# Radius Scale



```

none

sm

md

lg

xl

2xl

full

```



\---



\# Shadow Scale



```

sm

md

lg

xl

2xl

```



\---



\# Typography



Heading



```

h1

h2

h3

h4

```



Body



```

body-lg

body

body-sm

caption

label

```



\---



\# Layout Component



\- Container

\- Stack

\- Grid

\- Flex

\- Spacer

\- Separator



\---



\# Form Component



\- Button

\- Input

\- Textarea

\- Select

\- Checkbox

\- Radio

\- Switch

\- Slider

\- DatePicker

\- OTP

\- Combobox

\- Autocomplete



\---



\# Feedback Component



\- Alert

\- Toast

\- Progress

\- Spinner

\- Skeleton

\- Empty State



\---



\# Navigation Component



\- Navbar

\- Sidebar

\- Breadcrumb

\- Tabs

\- Pagination

\- Menu

\- Dropdown



\---



\# Overlay Component



\- Modal

\- Drawer

\- Sheet

\- Popover

\- Tooltip

\- Hover Card



\---



\# Data Display



\- Table

\- Card

\- Avatar

\- Badge

\- Tag

\- Timeline

\- Calendar

\- List



\---



\# Media



\- Image

\- Video

\- Carousel



\---



\# Utility Component



\- Divider

\- Scroll Area

\- Aspect Ratio

\- Portal

\- Visually Hidden



\---



\# Prinsip UI Library



Semua komponen harus memenuhi prinsip berikut:



\- Reusable

\- Composable

\- Accessible

\- Themeable

\- Responsive

\- Type-safe

\- Tree-shakable

\- Dark Mode Ready

\- Animation Ready



\---



\# Checklist Sebelum Publish



\- Dokumentasi lengkap

\- Storybook tersedia

\- Unit Test

\- Accessibility Test

\- Responsive Test

\- Dark Mode Test

\- TypeScript Support

\- Tidak ada hardcoded color

\- Menggunakan Design Token

\- Props terdokumentasi



\---



\# Teknologi yang Direkomendasikan



\- React

\- TypeScript

\- Tailwind CSS

\- Class Variance Authority (CVA)

\- Tailwind Merge

\- Radix UI

\- Storybook

\- Vitest

\- React Testing Library

\- ESLint

\- Prettier



\---



\# Filosofi



> Bangun komponen sekali, gunakan di mana saja.



Komponen harus:



\- Konsisten

\- Mudah digunakan

\- Mudah dikembangkan

\- Mudah diuji

\- Mudah dipelihara

\- Mendukung tema

\- Memiliki API yang sederhana

