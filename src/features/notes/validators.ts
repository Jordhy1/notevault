import { z } from "zod";

export const noteTypeSchema = z.enum([
  "GENERAL",
  "PROMPT",
  "IDEA",
  "STUDY",
  "WORK",
  "CODE",
  "BOOKMARK",
  "TODO",
  "REFERENCE",
]);

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(200),
  content: z.string().max(100000).default(""),
  type: noteTypeSchema.default("GENERAL"),
  collectionId: z.string().cuid().nullable().optional(),
  tagNames: z.array(z.string().trim().min(1).max(50)).max(20).default([]),
});

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string().cuid(),
});

export const updateNoteContentSchema = z.object({
  id: z.string().cuid(),
  title: z.string().trim().min(1).max(200),
  content: z.string().max(100000),
});

export const updateNoteMetadataSchema = z.object({
  id: z.string().cuid(),
  type: noteTypeSchema,
  collectionId: z.string().cuid().nullable().optional(),
  tagNames: z.array(z.string().trim().min(1).max(50)).max(20).default([]),
});

export const noteIdSchema = z.object({ id: z.string().cuid() });

export type CreateNoteInput = z.input<typeof createNoteSchema>;
export type UpdateNoteInput = z.input<typeof updateNoteSchema>;
