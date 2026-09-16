import { z } from "zod";

export const collectionSchema = z.object({
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().max(300).optional().nullable(),
  icon: z.string().trim().max(10).optional().nullable(),
});

export const collectionIdSchema = z.object({ id: z.string().cuid() });
export type CollectionInput = z.input<typeof collectionSchema>;
