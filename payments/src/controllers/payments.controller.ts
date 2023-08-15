import { NextFunction, Request, Response } from 'express';
import { CreatePaymentDto, CreatePaymentSchema } from '@dtos/payments.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Payment } from '@prisma/client';
import PaymentsService from '@services/payments.service';

class PaymentsController {
  public paymentService = new PaymentsService();

  public createPaymentForUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paymentData: CreatePaymentDto = req.body;
      const validatedPayment = CreatePaymentSchema.parse(paymentData);
      const paymentCreatedData: Payment = await this.paymentService.createPaymentForUser(validatedPayment);

      res.status(201).json({ data: paymentCreatedData, message: 'Payment success' });
    } catch (error) {
      next(error);
    }
  };

  public getAllPaymentsForUser = async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      const payments: Payment[] | null = await this.paymentService.getAllPaymentsForUser(userId);
      const totalAmount = this.paymentService.getTotalAmount(payments);

      res.status(200).json({ payments, totalAmount });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public getPaymentById = async (req: Request, res: Response): Promise<void> => {
    // example endpoint for admin
    try {
      const { id } = req.params;
      const payment: Payment | null = await this.paymentService.getPaymentById(id);
      res.status(200).json({ payment });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public deletePaymentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // example endpoint for admin
    try {
      const { id } = req.params;
      const deletedPayment: Payment = await this.paymentService.deletePaymentById(id);
      res.status(200).json({ payment: deletedPayment });
    } catch (error) {
      next(error);
    }
  };

  public getAllPayments = async (req: Request, res: Response): Promise<void> => {
    // example endpoint for admin
    try {
      const payments: Payment[] = await this.paymentService.getAllPayments();
      res.status(200).json({ payments });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}

export default PaymentsController;
