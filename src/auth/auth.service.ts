import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TokenResponse } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashedPassword,
      },
    });
    const tokens = await this.generateTokens(user.id, user.email);
    return { tokens, user };
  }

  async login(dto: LoginDto): Promise<TokenResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new ForbiddenException('Invalid credentials');

    const tokens = await this.generateTokens(user.id, user.email);
    // await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshTokens(data: RefreshTokenDto): Promise<TokenResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) throw new ForbiddenException('Access Denied');

    // const isValid = await bcrypt.compare(data.refreshToken, user.refreshToken);
    // if (!isValid) throw new ForbiddenException('Invalid refresh token');
    try {
      await this.jwtService.verifyAsync(data.refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    // await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async generateTokens(userId: string, email: string): Promise<TokenResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  // async updateRefreshToken(userId: string, refreshToken: string) {
  //   const hashed = await bcrypt.hash(refreshToken, 10);
  //   await this.prisma.user.update({
  //     where: { id: userId },
  //     data: { refreshToken: hashed },
  //   });
  // }
}
