import prisma from '@repository/prisma';
import { User } from '@prisma/client';
import { CreateUserDTO, UserDTO } from '@dtos/user.dto';

const userDAO = {
  async createUser(data: CreateUserDTO, hashedPassword: string): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
  },

  async getUser(data: UserDTO): Promise<User | null> {
    return prisma.user.findFirst({ where: { email: data.email, password: data.password } });
  },

  async getUserByEmail(data: UserDTO): Promise<User | null> {
    return prisma.user.findUnique({ where: { email: data.email } });
  },

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  },

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async updateUser(id: string, data: UserDTO): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  },
};

export default userDAO;
