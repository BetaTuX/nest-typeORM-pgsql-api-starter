import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

export interface JwtPayload {
  sub: string;
  mail: string;
  iat: Date;
  exp: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByMail(username);
    if (user && user.pass === pass) {
      //TODO: crypt your password
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { mail: user.mail, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
