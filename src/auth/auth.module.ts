import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './helpers/encriptar.helpers';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),    
    JwtModule.register({
      secret: jwtConstants().JWT_TOKEN,
      signOptions: {
        expiresIn: jwtConstants().JWT_EXPIRATION_TIME
      }
    })
  ],
  providers: [AuthService, JwtStrategy,ConfigService],
  exports: [AuthModule,PassportModule]
})
export class AuthModule { }
