import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
