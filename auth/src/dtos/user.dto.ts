import { z } from 'zod';
import { validations } from '@utils/schemaValidations';

const CreateUserSchema = z.object({
  email: validations.email,
  name: validations.name,
  password: validations.password,
});

type CreateUserDTO = z.infer<typeof CreateUserSchema>;

const UserSchema = z.object({
  email: validations.email,
  name: validations.name.optional(),
  password: z.string(),
  subscribed: validations.subscription.optional(),
});

type UserDTO = z.infer<typeof UserSchema>;

export { CreateUserDTO, CreateUserSchema, UserDTO, UserSchema };
