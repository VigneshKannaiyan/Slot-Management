import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('byEmail')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('byId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserById(@Query('id') id: string) {
    return this.userService.findById(id);
  }
}
