import { User } from '@prisma/client';
import prisma from '@config/prisma';
import config from '@config/config';
import { CustomError } from '@exceptions/CustomError';
import { ErrorCodes } from '@utils/errorCodes';
import subscriptionClient from '@/clients/subscriptionClient';
import { CreateSubscriptionSchema } from '@dtos/subscription.dto';

class SubscriptionService {
  public async createSubscriptionPayment(data: User, cookie: string) {
    const findUser: User = await prisma.user.findUnique({ where: { email: data.email } });
    if (!findUser) throw new CustomError(ErrorCodes.UserNotFound);

    const payment = { userId: findUser.id, amount: config.SUBSCRIPTION_PRICE };
    const validatedPayment = CreateSubscriptionSchema.parse(payment);

    return await subscriptionClient.createSubscriptionPayment(validatedPayment, cookie);
  }
}

export default SubscriptionService;
