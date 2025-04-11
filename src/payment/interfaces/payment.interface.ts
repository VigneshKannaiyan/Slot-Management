import { PaymentStatus } from '@prisma/client';
import { BookingStatus } from 'src/enums/booking-status.enum';

export interface PaymentInterface {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  bookingStatus?: BookingStatus;
  createdAt: Date;
}
