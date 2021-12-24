import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConnectionDto, CredentialsDto } from './dto/connection.dto';

export interface JwtPayload {
  sub: string;
  mail: string;
  iat?: Date;
  exp?: Date;
}

@Injectable()
export class AuthService {
  private SALT_ROUNDS = 10;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    mail: string,
    plainTextPass: string,
  ): Promise<Partial<User>> {
    const user = await this.userService.findOneByMail(mail);
    let dto: Partial<User>;

    console.log('Validate User');
    console.trace('checkTrace');
    bcrypt.compare(plainTextPass, user?.pass, function(err, isValid) {
      if (err) throw err;
      if (isValid) {
        const { pass, ...result } = user;
        dto = result;
        console.log('Valid', dto);
      } else {
        dto = null;
        console.log('Invalid');
      }
    });
    console.log('end');
    return dto;
  }

  async login(credentials: CredentialsDto): Promise<ConnectionDto> {
    const user = await this.userService.findOneByMail(credentials.mail);
    const isMatch = await bcrypt.compare(credentials.pass, user.pass);

    if (isMatch) {
      const payload = { mail: user.mail, sub: user.id };
      console.log('Valid', payload);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      console.log('Invalid');
      return null;
    }
  }

  async register(user: CredentialsDto): Promise<ConnectionDto> {
    let payload: JwtPayload;
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    const hash = await bcrypt.hash(user.pass, salt);

    console.log('LA');
    return this.userService
      .create({ mail: user.mail, pass: hash })
      .then((user) => {
        payload = {
          mail: user.mail,
          sub: user.id,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      });
  }
}
