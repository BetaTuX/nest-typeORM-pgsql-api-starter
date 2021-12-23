import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { globalGuardProvider } from './auth/global-guard.providers';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...globalGuardProvider],
})
export class AppModule {}
