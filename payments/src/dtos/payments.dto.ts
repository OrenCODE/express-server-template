import { z } from 'zod';

const CreatePaymentSchema = z.object({
  amount: z.number(),
  userId: z.string().nonempty(),
  updatedAt: z.date().optional(),
});

type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>;

export { CreatePaymentDto, CreatePaymentSchema };
