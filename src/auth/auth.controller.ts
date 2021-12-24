import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/connection.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('auth/login')
  async login(@Body() credentials: CredentialsDto) {
    return this.authService.login(credentials);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() credentials: CredentialsDto) {
    return this.authService.register(credentials);
  }

  /**
   * Test public route
   * TODO: Remove after next resource
   * @param req
   */
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
