import { NextFunction, Request, Response } from 'express';
import { CreatePaymentDTO, CreatePaymentSchema } from '@dtos/payments.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Payment } from '@prisma/client';
import PaymentsService from '@services/payments.service';

const PaymentsController = () => {
  const paymentService = PaymentsService();

  const createPaymentForUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paymentData: CreatePaymentDTO = req.body;
      const senderId = req.user.id;
      const validatedPayment = CreatePaymentSchema.parse(paymentData);
      const paymentCreatedData: Payment = await paymentService.createPaymentForUser(validatedPayment, senderId);

      res.status(201).json({ data: paymentCreatedData, message: 'Payment success' });
    } catch (error) {
      next(error);
    }
  };

  const getAllPaymentsForUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const payments: Payment[] | null = await paymentService.getAllPaymentsForUser(userId);
      const totalAmount = paymentService.getTotalAmount(payments);

      res.status(200).json({ payments, totalAmount });
    } catch (error) {
      next(error);
    }
  };

  const getPaymentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // example endpoint for admin
    try {
      const { id } = req.params;
      const payment: Payment | null = await paymentService.getPaymentById(id);
      res.status(200).json({ payment });
    } catch (error) {
      next(error);
    }
  };

  const deletePaymentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // example endpoint for admin
    try {
      const { id } = req.params;
      const deletedPayment: Payment = await paymentService.deletePaymentById(id);
      res.status(200).json({ payment: deletedPayment });
    } catch (error) {
      next(error);
    }
  };

  const getAllPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // example endpoint for admin
    try {
      const payments: Payment[] = await paymentService.getAllPayments();
      res.status(200).json({ payments });
    } catch (error) {
      next(error);
    }
  };

  return { getAllPayments, getPaymentById, getAllPaymentsForUser, createPaymentForUser, deletePaymentById };
};

export default PaymentsController;
