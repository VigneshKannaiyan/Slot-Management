import { Body, Controller, Post, UseGuards, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto, ConfirmPaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('byBookingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  initiatePayment(@Body() dto: InitiatePaymentDto) {
    return this.paymentService.initiatePayment(dto);
  }

  @Put('confirm/byId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  confirmPayment(@Body() dto: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(dto);
  }
}
