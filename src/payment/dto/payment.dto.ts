import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from 'src/enums/payment-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class InitiatePaymentDto {
  @ApiProperty({
    example: 'booking123',
    description: 'ID of the booking associated with this payment',
  })
  @IsNotEmpty()
  @IsString()
  bookingId: string;

  @ApiProperty({
    example: 99.99,
    description: 'Amount to be paid',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: PaymentStatus,
    example: PaymentStatus.SUCCESS,
    description: 'Final status of the payment',
  })
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}

export class ConfirmPaymentDto {
  @ApiProperty({
    example: 'payment123',
    description: 'ID of the payment to be confirmed',
  })
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @ApiProperty({
    enum: PaymentStatus,
    example: PaymentStatus.SUCCESS,
    description: 'Final status of the payment',
  })
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
