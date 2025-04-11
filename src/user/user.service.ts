import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({ where: { id } });
  }
}
