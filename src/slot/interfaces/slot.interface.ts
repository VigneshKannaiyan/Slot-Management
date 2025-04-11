import { UsageType, SlotStatus } from '@prisma/client';

export interface SlotInterface {
  id: string;
  displayId: string;
  startTime: Date;
  endTime: Date;
  usageType: UsageType;
  price: number;
  status: SlotStatus;
}
