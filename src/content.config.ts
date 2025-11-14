import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Accept either a single category (string) or multiple categories (array)
			// Normalize to array for consistent handling
			category: z
				.union([z.string().min(1), z.array(z.string().min(1)).min(1)])
				.transform((val) => (Array.isArray(val) ? val : [val])),
			heroImage: image().optional(),
		}),
});

const tea = defineCollection({
	// Load Markdown and MDX files in the `src/content/tea/` directory.
	loader: glob({ base: './src/content/tea', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Accept either a single category (string) or multiple categories (array)
			// Normalize to array for consistent handling
			category: z
				.union([z.string().min(1), z.array(z.string().min(1)).min(1)])
				.transform((val) => (Array.isArray(val) ? val : [val])),
			heroImage: image().optional(),
		}),
});

export const collections = { blog, tea };
