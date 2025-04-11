import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InitiatePaymentDto, ConfirmPaymentDto } from './dto/payment.dto';
import { PaymentInterface } from './interfaces/payment.interface';
import { PaymentStatus } from 'src/enums/payment-status.enum';
import { BookingStatus } from 'src/enums/booking-status.enum';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async initiatePayment(dto: InitiatePaymentDto): Promise<PaymentInterface> {
    const payment = await this.prisma.payment.create({
      data: {
        bookingId: dto.bookingId,
        amount: dto.amount,
      },
    });
    return payment;
  }

  async confirmPayment(dto: ConfirmPaymentDto): Promise<PaymentInterface> {
    const updatePayment = await this.prisma.payment.update({
      where: { id: dto.paymentId },
      data: { status: dto.status },
    });

    const bookingStatus =
      updatePayment?.status === PaymentStatus.PENDING
        ? BookingStatus.PENDING
        : updatePayment?.status === PaymentStatus.SUCCESS
          ? BookingStatus.CONFIRMED
          : updatePayment?.status === PaymentStatus.FAILED
            ? BookingStatus.CANCELLED
            : BookingStatus.COMPLETED;

    const updateBookingStatus = await this.prisma.booking.update({
      where: { id: updatePayment.bookingId },
      data: { paymentStatus: updatePayment.status, status: bookingStatus },
    });

    return {
      ...updatePayment,
      bookingStatus: updateBookingStatus?.status as BookingStatus,
    };
  }
}
