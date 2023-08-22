import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { CustomError } from '@exceptions/CustomError';
import { ErrorCodes } from '@utils/errorCodes';
import { UserDto, CreateUserDto } from '@dtos/users.dto';
import prisma from '@config/prisma';
import { createAuthCookie } from '@utils/cookieHandler';

const AuthService = () => {
  const signup = async (data: CreateUserDto): Promise<{ cookie: string; newUser: User }> => {
    const findUser: User = await prisma.user.findUnique({ where: { email: data.email } });
    if (findUser) throw new CustomError(ErrorCodes.UserAlreadyExists);

    const hashedPassword = await hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    const cookie = createAuthCookie(newUser);
    return { cookie, newUser };
  };

  const login = async (data: UserDto): Promise<{ cookie: string; findUser: User }> => {
    const findUser: User = await prisma.user.findUnique({ where: { email: data.email } });
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    const isPasswordMatching: boolean = await compare(data.password, findUser.password);
    if (!isPasswordMatching) throw new CustomError(ErrorCodes.InvalidLoginCredentials);

    const cookie = createAuthCookie(findUser);
    return { cookie, findUser };
  };

  const logout = async (data: UserDto): Promise<User> => {
    const findUser: User = await prisma.user.findFirst({ where: { email: data.email, password: data.password } });
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    return findUser;
  };

  return { signup, login, logout };
};

export default AuthService;
