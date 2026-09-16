# NoteVault

Personal knowledge and notes app untuk menyimpan, mengorganisasi, mencari, dan menggunakan kembali berbagai informasi pribadi.

NoteVault memperlakukan **Note** sebagai entity utama. Prompt, idea, code, bookmark, todo, study notes, dan work notes adalah variasi dari Note, bukan produk terpisah.

## Documentation

- [Architecture](.devin/ARCHITECTURE.md) — struktur teknis, folder, data flow, database, security, dan conventions.
- [Blueprint](.devin/BLUEPRINT.md) — product vision, fitur, UX, user flow, MVP, dan roadmap.

## Core Philosophy

> Capture quickly. Organize optionally. Find instantly. Reuse easily.

## Initial Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma
- Auth.js
- TipTap
- Zod

## Development Direction

Bangun MVP terlebih dahulu:

1. Authentication
2. Notes CRUD
3. Editor + autosave
4. Collections
5. Tags
6. Search
7. Pin / Favorite / Recent
8. Note types: Prompt, Idea, Code, Bookmark, Todo
9. Responsive UI
10. Deploy

Fitur AI, semantic search, browser extension, mobile app, dan collaboration ditunda sampai core experience stabil.
