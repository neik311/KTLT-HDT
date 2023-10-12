import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserRepository } from '../../repositories'

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(public readonly configService: ConfigService, private readonly userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  /** Xác thực token jwt */
  async validate(payload: { uid: string }) {
    const user: any = await this.userRepo.findOne({
      where: { id: payload.uid },
      select: {
        id: true,
        username: true,
      },
      relations: {
        role: true,
      },
    })
    if (!user) throw new UnauthorizedException('Không có quyền truy cập!')
    user.roleCode = user.__role__.code
    delete user.__role__
    return user
  }
}
