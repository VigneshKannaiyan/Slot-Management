import { Module } from '@nestjs/common';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SlotController],
  providers: [SlotService, PrismaService, JwtService],
  exports: [SlotService],
})
export class SlotModule {}
