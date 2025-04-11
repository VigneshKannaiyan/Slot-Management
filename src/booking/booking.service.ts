import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/booking.dto';
import { BookingInterface as IBooking } from './interfaces/booking.interface';
import { SlotInterface as ISlot } from 'src/slot/interfaces/slot.interface';
import { SlotStatus } from 'src/enums/slot-status.enum';
import { BookingStatus } from 'src/enums/booking-status.enum';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(dto: CreateBookingDto): Promise<IBooking> {
    const slot: ISlot | null = await this.prisma.slot.findUnique({
      where: { id: dto.slotId },
    });

    if (!slot || slot.status !== SlotStatus.AVAILABLE) {
      throw new Error('Slot not available');
    }

    const booking: IBooking = await this.prisma.booking.create({
      data: {
        ...dto,
        status: BookingStatus.PENDING,
        timestamp: new Date(),
      },
    });

    await this.prisma.slot.update({
      where: { id: dto.slotId },
      data: { status: SlotStatus.RESERVED },
    });

    return booking;
  }

  async getBookingsByUser(userId: string): Promise<IBooking[]> {
    return this.prisma.booking.findMany({
      where: { userId },
    });
  }
}
