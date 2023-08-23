import { z } from 'zod';
import { validations } from '@utils/schemaValidations';

const CreateSubscriptionSchema = z.object({
  userId: validations.userId,
  amount: validations.amount,
});

type CreateSubscriptionDTO = z.infer<typeof CreateSubscriptionSchema>;

export { CreateSubscriptionDTO, CreateSubscriptionSchema };
