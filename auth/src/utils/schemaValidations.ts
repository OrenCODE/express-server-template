import { z } from 'zod';

const objectIdValidator = z.string().refine(
  value => {
    if (!/^[0-9a-fA-F]+$/.test(value)) {
      return false;
    }
    return value.length === 24;
  },
  { message: 'Invalid ObjectId format' },
);

export const validations = {
  email: z.string().email('Invalid email address'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: 'Name must only contain alphabetic characters and spaces',
    }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  userId: objectIdValidator,
  amount: z.number(),
  subscription: z.boolean(),
};
