# NoteVault — Architecture

## 1. Purpose

Dokumen ini menjelaskan **bagaimana NoteVault dibangun**.

Untuk product requirements, UX, dan feature roadmap, lihat [`BLUEPRINT.md`](./BLUEPRINT.md).

---

## 2. Architectural Principles

### 2.1 Note is the primary entity

Jangan membuat Prompt, Idea, Code, atau Bookmark sebagai entity utama yang terpisah.

Gunakan satu entity:

```text
Note
```

dengan `type`:

```text
GENERAL
PROMPT
IDEA
STUDY
WORK
CODE
BOOKMARK
TODO
REFERENCE
```

Hal ini membuat sistem mudah diperluas.

### 2.2 Server-first

Gunakan Next.js Server Components secara default.

Gunakan Client Components hanya untuk bagian yang membutuhkan interaksi browser, state lokal, atau event handling.

Contoh Client Components:

- NoteEditor
- SearchInput
- CommandPalette
- Dialog
- Dropdown
- TagSelector

Jangan membuat seluruh halaman dashboard menjadi Client Component tanpa alasan.

### 2.3 Feature-oriented code

Logic domain dikelompokkan berdasarkan fitur:

```text
features/
├── notes/
├── collections/
├── tags/
├── search/
└── auth/
```

Komponen UI reusable berada di `components/`.

### 2.4 Security by default

Semua operasi terhadap data user harus dibatasi berdasarkan `userId`.

Jangan mengambil Note hanya berdasarkan `noteId` lalu menganggap user berhak mengaksesnya.

Gunakan pola:

```ts
where: {
  id: noteId,
  userId: currentUser.id,
}
```

---

# 3. High-Level Architecture

```text
                    ┌──────────────────────┐
                    │       Browser        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Next.js        │
                    │ App Router + React   │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
        Server Pages     Server Actions       API Routes
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                        Validation Layer
                             Zod
                               │
                               ▼
                            Prisma
                               │
                               ▼
                         PostgreSQL
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
                 Storage                 Auth
              Attachments              Auth.js
```

---

# 4. Recommended Project Structure

```text
notevault/
│
├── docs/
│   ├── ARCHITECTURE.md
│   └── BLUEPRINT.md
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   ├── icons/
│   └── images/
│
├── src/
│   │
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   ├── notes/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [noteId]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── favorites/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── pinned/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── recent/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── collections/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [collectionId]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── tags/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [tagId]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── search/
│   │   │   │   └── route.ts
│   │   │   └── upload/
│   │   │       └── route.ts
│   │   │
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── notes/
│   │   ├── collections/
│   │   ├── tags/
│   │   └── search/
│   │
│   ├── features/
│   │   ├── notes/
│   │   │   ├── actions.ts
│   │   │   ├── mutations.ts
│   │   │   ├── queries.ts
│   │   │   ├── validators.ts
│   │   │   └── types.ts
│   │   ├── collections/
│   │   │   ├── actions.ts
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   ├── tags/
│   │   │   ├── actions.ts
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   ├── search/
│   │   │   ├── search.ts
│   │   │   └── types.ts
│   │   └── auth/
│   │       ├── auth.ts
│   │       └── types.ts
│   │
│   ├── hooks/
│   │   ├── use-debounce.ts
│   │   ├── use-command-menu.ts
│   │   └── use-mobile.ts
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   └── prisma.ts
│   │   ├── auth/
│   │   │   └── session.ts
│   │   ├── storage/
│   │   │   └── storage.ts
│   │   ├── search/
│   │   │   └── search-utils.ts
│   │   └── utils/
│   │       ├── cn.ts
│   │       ├── dates.ts
│   │       └── text.ts
│   │
│   └── types/
│       ├── note.ts
│       ├── collection.ts
│       └── tag.ts
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

# 5. Folder Responsibilities

## `src/app`

Next.js routes, layouts, loading/error states, and route-level composition.

Jangan menaruh business logic besar di `page.tsx`.

## `src/components`

Reusable presentation components.

Contoh:

```text
components/notes/note-card.tsx
components/notes/note-editor.tsx
components/search/search-bar.tsx
```

## `src/features`

Domain/business logic.

Contoh:

```text
features/notes/mutations.ts
features/notes/queries.ts
features/notes/validators.ts
```

## `src/lib`

Infrastructure dan shared utilities.

Contoh:

- database client
- authentication helpers
- storage client
- generic utility functions

## `src/hooks`

Reusable React hooks yang memang membutuhkan client-side behavior.

## `src/types`

Shared TypeScript types yang dipakai lintas feature.

---

# 6. Database Model

Core relationship:

```text
User
 │
 ├── Notes
 │    ├── Tags
 │    ├── Attachments
 │    └── Versions
 │
 ├── Collections
 │
 └── Tags
```

## User

```text
User
----
id
email
name
avatar
createdAt
updatedAt
```

## Note

```text
Note
----
id
userId
title
content
type
collectionId
isPinned
isFavorite
createdAt
updatedAt
lastOpenedAt
```

## Collection

```text
Collection
----------
id
userId
name
description
icon
createdAt
updatedAt
```

## Tag

```text
Tag
---
id
userId
name
createdAt
```

## NoteTag

```text
NoteTag
-------
noteId
tagId
```

## Attachment

```text
Attachment
----------
id
noteId
fileName
fileUrl
fileType
fileSize
createdAt
```

## NoteVersion

```text
NoteVersion
-----------
id
noteId
title
content
versionNumber
createdAt
```

`NoteVersion` dapat ditambahkan setelah MVP.

---

# 7. Note Types

Gunakan enum:

```text
GENERAL
PROMPT
IDEA
STUDY
WORK
CODE
BOOKMARK
TODO
REFERENCE
```

Type hanya menentukan metadata atau behavior tambahan.

Contoh:

```text
PROMPT → tombol Copy Prompt
CODE → code block / Copy Code
BOOKMARK → URL metadata
TODO → checklist behavior
```

Semua tetap merupakan `Note`.

---

# 8. Data Flow — Create Note

```text
User
 ↓
Note Editor
 ↓
createNote()
 ↓
Zod validation
 ↓
Authentication check
 ↓
User ownership check
 ↓
Prisma
 ↓
PostgreSQL
 ↓
revalidatePath()
 ↓
UI
```

---

# 9. Data Flow — Edit Note

```text
Editor
 ↓
Debounced autosave
 ↓
Server Action
 ↓
Validate
 ↓
Verify session
 ↓
Verify note.userId
 ↓
Update database
 ↓
Revalidate
```

Autosave sebaiknya menggunakan debounce agar tidak melakukan database request setiap karakter.

---

# 10. Data Flow — Search

MVP:

```text
Search Input
 ↓
Debounce
 ↓
Search Server Action / Route
 ↓
PostgreSQL
 ↓
title/content/tags
 ↓
Results
```

V2:

```text
Query
 ↓
Semantic Search
 ↓
Embeddings
 ↓
Vector Search
 ↓
Relevant Notes
```

Jangan menambahkan vector database pada MVP.

---

# 11. Server Actions

Gunakan Server Actions untuk mutation utama:

```text
createNote()
updateNote()
deleteNote()

toggleFavorite()
togglePinned()

createCollection()
updateCollection()
deleteCollection()

createTag()
deleteTag()
```

Setiap action:

1. validasi input
2. cek authentication
3. cek ownership
4. lakukan mutation
5. revalidate path

---

# 12. Queries

Query read dipisahkan dari mutation.

Contoh:

```text
getNotes()
getNoteById()
getRecentNotes()
getFavoriteNotes()
getPinnedNotes()

getCollections()
getCollectionById()

getTags()
getNotesByTag()
```

---

# 13. Validation

Gunakan Zod.

Contoh conceptual schema:

```ts
CreateNoteSchema = {
  title,
  content,
  type,
  collectionId?,
  tags?
}
```

Validasi server adalah source of truth.

Client validation hanya untuk UX.

---

# 14. Authentication

Gunakan Auth.js.

Flow:

```text
Login
 ↓
Session
 ↓
currentUser
 ↓
Server Action
 ↓
userId
```

Jangan mempercayai `userId` yang dikirim dari client.

Ambil user identity dari server session.

---

# 15. Authorization

Setiap query/mutation harus scoped ke user.

Contoh pola:

```ts
const note = await prisma.note.findFirst({
  where: {
    id: noteId,
    userId: session.user.id,
  },
});
```

Bukan:

```ts
prisma.note.findUnique({
  where: { id: noteId },
});
```

untuk data private.

---

# 16. Search Strategy

## MVP

PostgreSQL full-text search / indexed search.

Search fields:

- title
- content
- tag name
- collection name

## Future

Semantic search menggunakan embeddings.

Use case:

User mencari:

```text
"prompt untuk caption jualan"
```

dan menemukan note yang tidak mengandung exact phrase tersebut.

---

# 17. Caching & Revalidation

Gunakan Next.js caching secara selektif.

Setelah mutation:

```text
revalidatePath("/notes")
revalidatePath("/notes/[noteId]")
```

Jangan membuat caching kompleks sebelum ada kebutuhan nyata.

---

# 18. Autosave Strategy

Recommended behavior:

```text
User typing
 ↓
Local editor state
 ↓
Debounce 800–1500ms
 ↓
Save
 ↓
"Saved"
```

Status:

```text
Saving...
Saved
Offline
Error saving
```

Jika autosave gagal, jangan menghapus isi editor.

---

# 19. Editor

Gunakan rich text editor seperti TipTap.

Capabilities awal:

- headings
- bold
- italic
- underline
- bullet list
- numbered list
- checklist
- code block
- blockquote
- links

Markdown support dapat ditambahkan untuk interoperability.

---

# 20. Attachments

Tidak perlu diimplementasikan pada MVP.

Architecture harus memungkinkan:

```text
Note
 └── Attachments
      ├── image
      ├── PDF
      └── file
```

Storage dapat menggunakan S3-compatible object storage.

Database hanya menyimpan metadata dan URL/reference.

---

# 21. Environment Variables

Gunakan `.env.example`.

Contoh:

```env
DATABASE_URL=
AUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

STORAGE_ENDPOINT=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_BUCKET=
```

Jangan commit `.env`.

---

# 22. Error Handling

Sediakan:

```text
loading.tsx
error.tsx
not-found.tsx
```

Untuk operasi mutation:

- tampilkan toast
- jangan kehilangan draft
- log error server
- berikan retry jika relevan

---

# 23. Naming Convention

Files:

```text
kebab-case.ts
```

Components:

```text
PascalCase
```

Functions:

```text
camelCase
```

Database:

```text
camelCase
```

atau mengikuti convention Prisma yang dipilih secara konsisten.

---

# 24. Component Rule

Component dibagi menjadi:

```text
UI
Presentation
Feature
Page
```

Contoh:

```text
Button
 ↓
NoteCard
 ↓
NotesList
 ↓
NotesPage
```

`NoteCard` tidak seharusnya mengetahui detail database.

---

# 25. Testing Strategy

MVP:

### Unit

Test:

- validators
- text utilities
- search utilities

### Integration

Test:

- create note
- update note
- delete note
- ownership protection

### E2E

Test critical flow:

```text
Login
 ↓
Create Note
 ↓
Edit
 ↓
Search
 ↓
Open
 ↓
Copy
```

---

# 26. Performance Principles

Prioritas:

1. fast initial load
2. server-side data fetching
3. pagination untuk note list
4. debounced search
5. lazy-load heavy editor components
6. optimize attachments/images

Jangan melakukan fetch semua notes sekaligus jika jumlahnya sudah besar.

---

# 27. Future Architecture

Jika aplikasi berkembang:

```text
                    NoteVault
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
       Core Notes     Search          AI
          │             │             │
          │        ┌────┴────┐        │
          │        ↓         ↓        │
          │      Text    Semantic     │
          │        Search    Search   │
          │                           │
          └───────────────────────────┘
```

AI menjadi service tambahan, bukan dependency inti dari notes.

---

# 28. Architecture Rule of Thumb

Sebelum menambahkan teknologi baru, tanyakan:

> Apakah PostgreSQL + Next.js + Prisma belum cukup?

Jika masih cukup, jangan menambahkan infrastructure baru.

Tujuannya menjaga project tetap sederhana dan mudah dirawat.
