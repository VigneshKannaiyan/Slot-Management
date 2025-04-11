import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSlotDto, UpdateSlotStatusDto } from './dto/slot.dto';
import { SlotStatus, UsageType } from 'src/enums/slot-status.enum';
import { SlotInterface as ISlot } from './interfaces/slot.interface';

@Injectable()
export class SlotService {
  constructor(private readonly prisma: PrismaService) {}

  async createSlot(data: CreateSlotDto): Promise<ISlot> {
    return this.prisma.slot.create({
      data: {
        ...data,
        status: SlotStatus.AVAILABLE,
      },
    });
  }

  async getAvailableSlots(query?: {
    usageType?: UsageType;
    displayId?: string;
  }): Promise<ISlot[]> {
    return this.prisma.slot.findMany({
      where: {
        status: SlotStatus.AVAILABLE,
        ...(query?.usageType && { usageType: query.usageType }),
        ...(query?.displayId && { displayId: query.displayId }),
      },
    });
  }

  async updateSlotStatus(
    id: string,
    data: UpdateSlotStatusDto,
  ): Promise<ISlot> {
    return this.prisma.slot.update({
      where: { id },
      data,
    });
  }

  async getSlotById(id: string): Promise<ISlot | null> {
    return this.prisma.slot.findUnique({ where: { id } });
  }
}
