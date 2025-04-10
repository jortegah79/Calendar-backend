import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/RegisterDTO.dto';
import { LoginDTO } from './dto/LoginDTO.dto';
import { User } from './entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }
  login(login: LoginDTO) {
    return { "ok": true, "login": login, "msg": "Login" };
  }

  async register(register: RegisterDTO) {

    try{
    const user = await this.userModel.create(register);
    await user.save();
    return { "ok": true, "user": user, "msg": "Usuario registrado correctamente" };
    }catch(error){
      throw new InternalServerErrorException({message:"Hable con el administrador."})
    }
  }

  refresh() {
    return { "ok": true, "msg": "refresh token" };
  }

}
