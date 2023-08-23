import prisma from '@repository/prisma';
import { User } from '@prisma/client';

const userDAO = {
  async createUser(data, hashedPassword): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
  },

  async getUser(data): Promise<User | null> {
    return prisma.user.findFirst({ where: { email: data.email, password: data.password } });
  },

  async getUserByEmail(data): Promise<User | null> {
    return prisma.user.findUnique({ where: { email: data.email } });
  },

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  },

  async getUserById(id): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async updateUser(id, data): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id): Promise<User> {
    return prisma.user.delete({ where: { id } });
  },
};

export default userDAO;
