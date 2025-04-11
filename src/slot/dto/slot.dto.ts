import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UsageType, SlotStatus } from 'src/enums/slot-status.enum';

export class CreateSlotDto {
  @ApiProperty({
    example: 'displayId123',
    description: 'ID of the display where slot is created',
  })
  @IsString()
  @IsNotEmpty()
  displayId: string;

  @ApiProperty({
    example: '2025-04-09T10:00:00Z',
    description: 'Slot start time',
  })
  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @ApiProperty({
    example: '2025-04-09T12:00:00Z',
    description: 'Slot end time',
  })
  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @ApiProperty({ enum: UsageType, example: UsageType.PERSONAL })
  @IsEnum(UsageType)
  usageType: UsageType;

  @ApiProperty({ example: 99.99, description: 'Price of the slot' })
  @IsNumber()
  price: number;
}

export class UpdateSlotStatusDto {
  @ApiProperty({ enum: SlotStatus, example: SlotStatus.RESERVED })
  @IsEnum(SlotStatus)
  status: SlotStatus;
}
