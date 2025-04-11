import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createBooking(@Body() dto: CreateBookingDto) {
    return this.bookingService.createBooking(dto);
  }

  @Get('userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserBookings(@Param('userId') userId: string) {
    return this.bookingService.getBookingsByUser(userId);
  }
}
