// import {Queue, Worker} from 'bullmq';
// import SubscriptionService from '@services/subscription.service';

// const subscriptionQueue = new Queue('subscriptionQueue');
//
// const subscriptionJobOpts = {
//   attempts: 3, // Number of retry attempts
//   backoff: {
//     type: 'exponential', // Backoff strategy
//     delay: 1000, // Initial delay in milliseconds
//   },
// };

// const subscriptionPaymentWorker = new Worker('subscriptionQueue', async job => {
//   const { payment, cookie } = job.data;
//   try {
//     // Simulate your actual payment logic here
//     console.log(`Processing subscription payment for user ID: ${payment.userId}`);
//
//     // Simulate a random success/failure
//     if (Math.random() < 0.7) {
//       throw new Error('Failed to process subscription payment');
//     }
//
//     console.log(`Subscription payment processed successfully for user ID: ${payment.userId}`);
//   } catch (error) {
//     // Job failed, enqueue it again with retry options
//     console.error(`Failed to process subscription payment for user ID: ${payment.userId}. Error: ${error.message}`);
//     // await job.moveToFailed({name: "", stack: "", message: error.message }, job.opts);
//   }
// });

// Create a queue worker
// const worker = new Worker('subscriptionQueue', async job => {
//   const { functionName, data } = job.data;
//   const subscriptionService = SubscriptionService();
//
//   switch (functionName) {
//     case FunctionNames.CreateSubscriptionPayment:
//       await subscriptionService.createSubscriptionPayment(data.user, data.cookie);
//       break;
//     case FunctionNames.UpdateSubscriptionStatus:
//       await subscriptionService.updateSubscriptionStatus(data.user, data.payment);
//       break;
//     default:
//       break;
//   }
// });

// enum FunctionNames {
//   CreateSubscriptionPayment = 'CreateSubscriptionPayment',
//   UpdateSubscriptionStatus = 'updateSubscriptionStatus',
// }

// export { subscriptionQueue, subscriptionJobOpts };
