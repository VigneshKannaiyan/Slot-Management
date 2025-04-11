import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/enums/payment-status.enum';

export class CreateBookingDto {
  @ApiProperty({
    example: 'slotId123',
    description: 'ID of the slot to be booked',
  })
  @IsString()
  @IsNotEmpty()
  slotId: string;

  @ApiProperty({
    example: 'userId456',
    description: 'ID of the user making the booking',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
