import { z } from 'zod';

export const validations = {
  email: z.string().email('Invalid email address'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: 'Name must only contain alphabetic characters and spaces',
    }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
};
