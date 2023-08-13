import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { CustomError } from '@exceptions/CustomError';
import { ErrorCodes } from '@utils/errorCodes';
import { UserDto, CreateUserDto } from '@dtos/users.dto';
import config from '@config/config';
import prisma from '@config/prisma';

class AuthService {
  public async signup(data: CreateUserDto): Promise<User> {
    const findUser: User = await prisma.user.findUnique({ where: { email: data.email } });
    if (findUser) throw new CustomError(ErrorCodes.UserAlreadyExists);

    const hashedPassword = await hash(data.password, 10);
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
  }

  public async login(data: UserDto): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await prisma.user.findUnique({ where: { email: data.email } });
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    const isPasswordMatching: boolean = await compare(data.password, findUser.password);
    if (!isPasswordMatching) throw new CustomError(ErrorCodes.InvalidLoginCredentials);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(data: UserDto): Promise<User> {
    const findUser: User = await prisma.user.findFirst({ where: { email: data.email, password: data.password } });
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.SECRET_KEY;
    const expiresIn: number = config.TOKEN_EXPIRY;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
