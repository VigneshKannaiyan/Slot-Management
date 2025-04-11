import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DisplayService } from './display.service';
import { CreateDisplayDto } from './dto/display.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('displays')
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createDisplayDto: CreateDisplayDto) {
    return this.displayService.createDisplay(createDisplayDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.displayService.getAllDisplays();
  }

  @Get('id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Query('id') id: string) {
    return this.displayService.getDisplayById(id);
  }

  @Delete('id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Query('id') id: string) {
    return this.displayService.deleteDisplay(id);
  }
}
