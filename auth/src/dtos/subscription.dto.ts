import { z } from 'zod';
import { validations } from '@utils/schemaValidations';

const CreateSubscriptionSchema = z.object({
  userId: validations.userId,
  amount: validations.amount,
});

type CreateSubscriptionDto = z.infer<typeof CreateSubscriptionSchema>;

export { CreateSubscriptionDto, CreateSubscriptionSchema };
