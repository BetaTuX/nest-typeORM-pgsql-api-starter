import { JwtAuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

export const globalGuardProvider = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];
