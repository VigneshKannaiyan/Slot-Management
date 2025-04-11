import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisplayDto } from './dto/display.dto';
import { DisplayInterface as IDisplay } from './interfaces/display.interface';
import { DisplayStatus } from 'src/enums/display-status.enum';

@Injectable()
export class DisplayService {
  constructor(private readonly prisma: PrismaService) {}

  async createDisplay(data: CreateDisplayDto): Promise<IDisplay> {
    return this.prisma.display.create({
      data: {
        ...data,
        status: DisplayStatus.ACTIVE,
      },
    });
  }

  async getAllDisplays(): Promise<IDisplay[]> {
    return this.prisma.display.findMany();
  }

  async getDisplayById(id: string): Promise<IDisplay | null> {
    return this.prisma.display.findUnique({ where: { id } });
  }

  async deleteDisplay(id: string): Promise<IDisplay> {
    return this.prisma.display.delete({ where: { id } });
  }
}
