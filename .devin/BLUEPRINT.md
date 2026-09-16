# NoteVault — Product Blueprint

## 1. Product Vision

NoteVault adalah personal notes dan knowledge app untuk menyimpan semua hal yang ingin pengguna ingat, temukan kembali, atau gunakan lagi.

> **Capture quickly. Organize optionally. Find instantly. Reuse easily.**

Aplikasi bukan Prompt Manager.

Prompt hanyalah salah satu jenis Note.

---

# 2. Core Concept

```text
                         NOTE
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
      GENERAL            PROMPT              IDEA
        ↓                  ↓                  ↓
      STUDY              CODE               WORK
        ↓                  ↓                  ↓
    BOOKMARK             TODO             REFERENCE
```

Semua disimpan di tempat yang sama.

---

# 3. Problems

User sering:

- lupa menyimpan informasi penting
- kehilangan prompt bagus di chat lama
- menyimpan notes di banyak tempat
- sulit menemukan catatan lama
- mengetik ulang informasi yang sama
- punya banyak ide tetapi tidak terorganisir

NoteVault menyelesaikan masalah tersebut dengan satu personal space.

---

# 4. Target Users

## Primary

Orang yang sering menyimpan:

- notes
- ideas
- prompts
- references
- snippets
- information

## Secondary

- developers
- students
- content creators
- researchers
- freelancers
- business users
- productivity enthusiasts

---

# 5. Core Experience

```text
CAPTURE
   ↓
ORGANIZE
   ↓
FIND
   ↓
USE
```

Contoh:

```text
Menemukan prompt
      ↓
Save
      ↓
Tambahkan #prompt
      ↓
Cari "youtube"
      ↓
Open
      ↓
Copy
```

---

# 6. Information Model

## Note

Fields:

```text
title
content
type
collection
tags
favorite
pinned
createdAt
updatedAt
lastOpenedAt
```

---

# 7. Note Types

Default:

```text
📝 General
🤖 Prompt
💡 Idea
📚 Study
💼 Work
💻 Code
🔗 Bookmark
✅ Todo
📌 Reference
```

User tidak diwajibkan memilih type saat membuat note.

Default:

```text
GENERAL
```

Type dapat diubah setelah note dibuat.

---

# 8. Collections

Collection adalah cara grouping yang lebih besar.

Contoh:

```text
Personal
Work
Projects
Learning
Ideas
AI
```

User dapat membuat collection sendiri.

Collection bukan pengganti tags.

---

# 9. Tags

Tags untuk hubungan yang lebih fleksibel.

Contoh:

```text
#nextjs
#react
#frontend
#chatgpt
#business
#idea
#important
```

Satu note dapat memiliki banyak tags.

---

# 10. Pin vs Favorite

## Pin

Untuk note yang harus mudah terlihat.

Contoh:

```text
📌 Current Project
📌 Important Commands
📌 Main Prompt
```

## Favorite

Untuk note yang disukai atau sering digunakan.

Contoh:

```text
⭐ Favorite Prompt
⭐ Useful Reference
```

Keduanya dapat aktif bersamaan.

---

# 11. Dashboard

Dashboard:

```text
┌─────────────────────────────────────────┐
│ NoteVault                         🔍 👤 │
├────────────┬────────────────────────────┤
│ Home       │ Good morning 👋            │
│ Notes      │                            │
│ Favorites  │ Search your notes...       │
│ Pinned     │                            │
│ Recent     │ Quick Access               │
│            │                            │
│ COLLECTION │ ⭐ Favorites               │
│ Personal   │ 🕐 Recent                  │
│ Work       │ 📌 Pinned                  │
│ Projects   │                            │
│ Ideas      │ Recent Notes               │
│ Learning   │                            │
│            │ Note Card                  │
│ Settings   │ Note Card                  │
│            │ Note Card             [+]  │
└────────────┴────────────────────────────┘
```

---

# 12. Main Navigation

Desktop:

```text
Home
Notes
Favorites
Pinned
Recent

Collections
 ├── Personal
 ├── Work
 ├── Projects
 ├── Learning
 └── Ideas

Settings
```

Mobile:

```text
Home
Search
+
Collections
More
```

---

# 13. Create Note

Klik:

```text
+
```

Menu:

```text
📝 Note
🤖 Prompt
💡 Idea
💻 Code
🔗 Bookmark
✅ Todo
```

Semua menghasilkan Note.

---

# 14. Quick Capture

Tujuan:

> User dapat menyimpan sesuatu dalam beberapa detik.

Minimal fields:

```text
Title
Content
```

Optional:

```text
Type
Collection
Tags
```

Jangan mewajibkan metadata.

---

# 15. Note Editor

Layout:

```text
← Back

Title

Type     Collection

Tags

────────────────────────

Editor

────────────────────────

Saved just now
```

Actions:

```text
Favorite
Pin
Copy
More
Delete
```

---

# 16. Autosave

Saat user mengetik:

```text
Writing...
     ↓
Debounce
     ↓
Saving...
     ↓
✓ Saved
```

User tidak perlu menekan Save setiap perubahan.

---

# 17. Prompt Behavior

Jika type:

```text
PROMPT
```

tambahkan:

```text
[Copy Prompt]
```

Jika prompt menggunakan variables:

```text
[TOPIC]
[AUDIENCE]
[TONE]
```

user dapat memilih:

```text
Use Template
```

Lalu mengisi variable.

Prompt tetap disimpan sebagai Note.

---

# 18. Code Behavior

Jika type:

```text
CODE
```

editor mendukung code block.

Actions:

```text
Copy Code
```

Code tidak membutuhkan entity khusus.

---

# 19. Bookmark Behavior

Jika user memasukkan URL:

```text
https://example.com
```

aplikasi dapat mengenalinya sebagai bookmark.

Metadata future:

```text
URL
Title
Description
Domain
```

Tetap disimpan sebagai Note.

---

# 20. Todo Behavior

Type:

```text
TODO
```

dapat menggunakan checklist.

Contoh:

```text
Project Tasks

☐ Setup database
☐ Build editor
☐ Add search
☐ Deploy
```

---

# 21. Search

Search harus tersedia dari hampir semua halaman.

Placeholder:

```text
Search your notes...
```

Search berdasarkan:

- title
- content
- tags
- collection
- type

---

# 22. Command Palette

Shortcut:

```text
Ctrl + K
```

Mac:

```text
⌘ K
```

Commands:

```text
Search
New Note
New Prompt
New Idea
New Code
New Bookmark

Go to Home
Go to Favorites
Go to Pinned
Go to Recent

Create Collection
Open Settings
```

---

# 23. Recent Notes

Urutkan berdasarkan:

```text
lastOpenedAt
```

bukan hanya `updatedAt`.

Contoh:

```text
Recently Used

Website Architecture
Opened 5 min ago

Useful Prompt
Opened 1 hour ago

React Notes
Opened yesterday
```

---

# 24. Collections Page

```text
Collections

┌──────────────┐
│ 💼 Work      │
│ 24 notes     │
└──────────────┘

┌──────────────┐
│ 💡 Ideas     │
│ 18 notes     │
└──────────────┘

┌──────────────┐
│ 📚 Learning  │
│ 31 notes     │
└──────────────┘

[+ New Collection]
```

---

# 25. Tags Page

```text
Tags

#nextjs       12 notes
#react         9 notes
#idea          7 notes
#prompt       18 notes
#business      4 notes
```

Klik tag → tampilkan semua Note terkait.

---

# 26. Empty States

## No Notes

```text
Nothing here yet.

Start capturing your ideas,
knowledge, and useful information.

[Create your first note]
```

## No Search Result

```text
No notes found.

Try another keyword or tag.
```

---

# 27. Dark Mode

Modes:

```text
Light
Dark
System
```

Dark mode harus tersedia sejak awal karena aplikasi akan banyak digunakan untuk membaca dan menulis.

---

# 28. Responsive UX

## Desktop

Sidebar permanen.

## Tablet

Sidebar compact/collapsible.

## Mobile

Bottom navigation + modal/sheet untuk quick actions.

Editor harus tetap nyaman di layar kecil.

---

# 29. Keyboard Shortcuts

Recommended:

```text
Ctrl / Cmd + K    Search
N                 New Note
C                 Copy
F                 Favorite
P                 Pin
E                 Edit
Esc               Close
```

Shortcut dapat ditambahkan bertahap.

---

# 30. Import

Post-MVP:

```text
TXT
Markdown
JSON
CSV
```

Future:

```text
Notion
Google Keep
Browser
Clipboard
```

---

# 31. Export

User dapat export:

```text
Markdown
JSON
TXT
```

Future:

```text
ZIP
PDF
```

---

# 32. Attachments

Future:

```text
Images
PDF
Documents
Screenshots
```

User dapat menyimpan attachment di dalam Note.

---

# 33. AI Features

AI bukan fitur utama MVP.

Future features:

### Summarize

```text
Summarize this note
```

### Auto Tags

```text
Suggest tags
```

### Ask Notes

```text
Ask my notes:

"What did I write about Next.js middleware?"
```

### Improve Prompt

Hanya ketika Note type adalah Prompt.

### Related Notes

```text
Related Notes

Next.js Auth
Middleware
Project Architecture
```

---

# 34. AI Architecture Principle

AI hanya menjadi layer tambahan:

```text
Core Notes
    │
    ├── Search
    ├── Organization
    └── AI
```

Core notes harus tetap berfungsi tanpa AI.

---

# 35. MVP Definition

MVP wajib:

```text
Authentication
Dashboard
Create Note
Edit Note
Delete Note
View Note
Autosave
Collections
Tags
Search
Favorites
Pinned
Recent
Dark Mode
Responsive UI
```

Note types:

```text
GENERAL
PROMPT
IDEA
CODE
```

---

# 36. MVP Should NOT Include

Jangan masukkan dulu:

```text
AI Chat
Vector Database
Marketplace
Community
Teams
Mobile App
Browser Extension
Complex Analytics
Social Features
```

Tujuan MVP adalah membuktikan bahwa:

> User ingin menyimpan dan menemukan kembali informasi menggunakan aplikasi ini.

---

# 37. V2

Tambahkan:

```text
Markdown
Bookmarks
Todo notes
Attachments
Import
Export
Version history
Better search
Keyboard shortcuts
```

---

# 38. V3

Tambahkan:

```text
AI tagging
AI summarization
Semantic search
Ask my notes
Related notes
Browser extension
Mobile application
```

---

# 39. V4

Jika sudah ada user:

```text
Sharing
Public notes
Collaboration
Team workspace
Encrypted private notes
Offline-first sync
API
Integrations
```

---

# 40. Main User Flow

```text
OPEN
 ↓
DASHBOARD
 ↓
CREATE / SEARCH
 ↓
NOTE
 ↓
READ / EDIT
 ↓
COPY / USE
```

---

# 41. Save Flow

```text
+
 ↓
New Note
 ↓
Title + Content
 ↓
Optional Type / Tags / Collection
 ↓
Autosave
 ↓
Done
```

---

# 42. Find Flow

```text
Ctrl + K
 ↓
Type keyword
 ↓
Search
 ↓
Results
 ↓
Open Note
 ↓
Use / Copy
```

---

# 43. Product Philosophy

### Capture first

Menyimpan sesuatu harus cepat.

### Organize second

Folder/tag bersifat optional.

### Search everything

User tidak perlu mengingat lokasi note.

### Reuse

Informasi yang disimpan harus mudah digunakan kembali.

### Stay simple

Jangan berubah menjadi aplikasi productivity yang terlalu kompleks.

---

# 44. Success Metrics

Metric awal:

### Activation

User membuat Note pertama.

### Retention

User kembali menggunakan aplikasi.

### Search usage

User menggunakan search untuk menemukan Note.

### Reuse

Berapa banyak Note yang dibuka/copy kembali.

### Notes per active user

Jumlah Note yang tersimpan per active user.

North Star:

> **Notes successfully rediscovered and reused.**

---

# 45. Roadmap

## Phase 1 — Foundation

```text
Project setup
Database
Auth
Layout
Theme
```

## Phase 2 — Notes

```text
CRUD
Editor
Autosave
Note types
```

## Phase 3 — Organization

```text
Collections
Tags
Favorites
Pinned
Recent
```

## Phase 4 — Discovery

```text
Search
Command palette
Keyboard shortcuts
```

## Phase 5 — Polish

```text
Responsive
Empty states
Loading states
Error states
Performance
Accessibility
```

## Phase 6 — Expansion

```text
Attachments
Import/export
Version history
AI
Semantic search
```

---

# 46. Definition of Done — MVP

MVP dianggap selesai ketika user dapat:

- register/login
- membuat Note
- menulis/edit Note
- keluar dari editor dan data tetap tersimpan
- mencari Note
- membuka kembali Note
- memberi tag
- memasukkan Note ke collection
- pin Note
- favorite Note
- melihat recent Notes
- copy content
- menggunakan Prompt type
- menggunakan Code type
- menggunakan dark mode
- menggunakan aplikasi dari mobile
- tidak dapat mengakses Note user lain

---

# 47. Final Product Model

```text
                         NOTEVAULT
                             │
                         EVERYTHING
                             │
          ┌──────────────────┼──────────────────┐
          ↓                  ↓                  ↓
       CAPTURE            ORGANIZE             FIND
          │                  │                  │
       ┌──┼──┐           ┌───┼───┐          ┌──┼──┐
       │  │  │           │   │   │          │  │  │
      Note Idea Prompt  Tags Collection   Search Recent
       │
   ┌───┼────┬────┬─────┐
   ↓   ↓    ↓    ↓     ↓
 Code Todo Study Work Bookmark
                             │
                             ↓
                           REUSE
```

---

# 48. Final Positioning

NoteVault bukan:

> "Aplikasi untuk menyimpan prompt."

Dan bukan juga sekadar:

> "Aplikasi notes biasa."

Positioning yang lebih tepat:

> **A personal space for everything you want to remember, find, and reuse.**

Prompt, ideas, code, bookmarks, study notes, work notes, dan informasi lainnya hidup dalam satu sistem Note yang sederhana.
