import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/auth.interface';

@Injectable()
export class RefreshJwtGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractRefreshToken(request);

    if (!token) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_REFRESH_TOKEN,
      });
      request['user'] = payload;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private extractRefreshToken(request: Request): string | undefined {
    const body = request.body as { refreshToken?: string };
    const bodyToken = body?.refreshToken;

    const authHeader = request.headers?.authorization;
    const headerToken = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : undefined;

    return bodyToken || headerToken;
  }
}
