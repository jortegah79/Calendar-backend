import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/usuario.entity';

@Module({
  controllers: [AuthController],
  imports:[MongooseModule.forFeature([{
    name:User.name,schema:UserSchema
  }])],
  providers: [AuthService],
})
export class AuthModule {}
