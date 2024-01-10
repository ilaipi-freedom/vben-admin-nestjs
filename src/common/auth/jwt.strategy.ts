import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthSessionKey } from '../../types/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    @Inject('APP_JWT_SECRET')
    private readonly secret: string,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: AuthSessionKey) {
    const session = await this.authService.validateUser(payload);
    return session;
  }
}
