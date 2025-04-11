import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { SlotModule } from './slot/slot.module';
import { DisplayModule } from './display/display.module';
import { PaymentModule } from './payment/payment.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BookingModule,
    SlotModule,
    DisplayModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService],
})
export class AppModule {}
