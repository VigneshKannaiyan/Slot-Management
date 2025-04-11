import { PaymentStatus } from '@prisma/client';

export interface BookingInterface {
  id: string;
  slotId: string;
  userId: string;
  paymentStatus: PaymentStatus;
  timestamp: Date;
}
