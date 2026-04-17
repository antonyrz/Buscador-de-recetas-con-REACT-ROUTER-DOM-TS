import { z } from 'zod';
import { CategoriesAPIResponseSchema, SearchFilterSchema } from '../schemas/recipes-schema';

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>