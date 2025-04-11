import { Module } from '@nestjs/common';
import { DisplayController } from './display.controller';
import { DisplayService } from './display.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DisplayController],
  providers: [DisplayService, PrismaService, JwtService],
  exports: [DisplayService],
})
export class DisplayModule {}
