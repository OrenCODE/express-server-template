import { z } from 'zod';

const CreatePaymentSchema = z.object({
  amount: z.number(),
  userId: z.string().nonempty(),
  updatedAt: z.date().optional(),
});

type CreatePaymentDTO = z.infer<typeof CreatePaymentSchema>;

export { CreatePaymentDTO, CreatePaymentSchema };
