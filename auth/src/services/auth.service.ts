import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { CustomError } from '@exceptions/CustomError';
import { ErrorCodes } from '@utils/errorCodes';
import { UserDTO, CreateUserDTO } from '@dtos/user.dto';
import { createAuthCookie } from '@utils/cookieHandler';
import userDAO from '@repository/user.dao';

const AuthService = () => {
  const signup = async (data: CreateUserDTO): Promise<{ cookie: string; newUser: User }> => {
    const userEmail = data.email.toLowerCase();
    const findUser: User = await userDAO.getUserByEmail(userEmail);
    if (findUser) throw new CustomError(ErrorCodes.UserAlreadyExists);

    const hashedPassword = (await hash(data.password, 10)) as string;
    const newUser = await userDAO.createUser(data, hashedPassword);
    const cookie = createAuthCookie(newUser);

    return { cookie, newUser };
  };

  const login = async (data: UserDTO): Promise<{ cookie: string; findUser: User }> => {
    const userEmail = data.email.toLowerCase();
    const findUser: User = await userDAO.getUserByEmail(userEmail);
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    const isPasswordMatching: boolean = await compare(data.password, findUser.password);
    if (!isPasswordMatching) throw new CustomError(ErrorCodes.InvalidLoginCredentials);

    const cookie = createAuthCookie(findUser);
    return { cookie, findUser };
  };

  const logout = async (data: UserDTO): Promise<User> => {
    const findUser: User = await userDAO.getUser(data);
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    return findUser;
  };

  return { signup, login, logout };
};

export default AuthService;
