// src/content.config.ts

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/* =========================
   POST
========================= */
const post = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/post',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),

    coverImage: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

/* =========================
   PODCAST
========================= */
const podcast = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/podcast',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),

    pubDate: z.coerce.date(),
    episodeNumber: z.number(),
    part: z.string().optional(),

    duration: z.string().optional(),
    audioUrl: z.string().optional(),

    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
  }),
});

/* =========================
   RESEARCH
========================= */
const research = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/research',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),

    pubDate: z.coerce.date(),
    category: z.string().optional(),

    tags: z.array(z.string()).default([]),

    coverImage: z.string().optional(),
    pdfUrl: z.string().optional(),

    featured: z.boolean().default(false),
  }),
});

/* =========================
   EXPORT
========================= */
export const collections = {
  post,
  podcast,
  research,
};