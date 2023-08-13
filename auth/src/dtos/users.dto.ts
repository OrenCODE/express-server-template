import { z } from 'zod';
import { validations } from '@utils/schemaValidations';

const CreateUserSchema = z.object({
  email: validations.email,
  name: validations.name,
  password: validations.password,
});

type CreateUserDto = z.infer<typeof CreateUserSchema>;

const UserSchema = z.object({
  email: validations.email,
  name: validations.name.optional(),
  password: validations.password,
});

type UserDto = z.infer<typeof UserSchema>;

export { CreateUserDto, CreateUserSchema, UserDto, UserSchema };
