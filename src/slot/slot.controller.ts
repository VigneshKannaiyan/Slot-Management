import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto, UpdateSlotStatusDto } from './dto/slot.dto';
import { UsageType } from 'src/enums/slot-status.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createSlotDto: CreateSlotDto) {
    return this.slotService.createSlot(createSlotDto);
  }

  @Get('available')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAvailable(
    @Query('usageType') usageType?: UsageType,
    @Query('displayId') displayId?: string,
  ) {
    return this.slotService.getAvailableSlots({ usageType, displayId });
  }

  @Patch('id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateStatus(@Query('id') id: string, @Body() dto: UpdateSlotStatusDto) {
    return this.slotService.updateSlotStatus(id, dto);
  }

  @Get('id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getSlot(@Query('id') id: string) {
    return this.slotService.getSlotById(id);
  }
}
