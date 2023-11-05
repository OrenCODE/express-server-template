import prisma from '@repository/prisma';
import { Payment } from '@prisma/client';
import { CreatePaymentDTO } from '@dtos/payments.dto';

const paymentDAO = {
  async createPayment(data: CreatePaymentDTO) {
    return prisma.payment.create({ data });
  },

  async getAllPayments(): Promise<Payment[]> {
    return prisma.payment.findMany();
  },

  async getPaymentById(id: string): Promise<Payment | null> {
    return prisma.payment.findUnique({ where: { id } });
  },

  async getAllPaymentsForUser(userId: string): Promise<Payment[] | null> {
    return prisma.payment.findMany({
      where: {
        userId: userId,
      },
    });
  },

  async deletePayment(id: string) {
    return prisma.payment.delete({ where: { id } });
  },
};

export default paymentDAO;
