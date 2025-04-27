import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/RegisterDTO.dto';
import { LoginDTO } from './dto/LoginDTO.dto';
import { User, UserDocument } from './entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encriptarPassword, verificaPassword } from './helpers/encriptar.helpers';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService) { }

  async login(login: LoginDTO) {
    const user = await this.userModel.findOne({ email: login.email }).select('+password name email')

    if (!user) throw new UnauthorizedException({ "ok": false, "msg": "NO hay usuarios con este correo" });

    const result = verificaPassword(login.password, user.password);

    if (result) {
      const userResponse = user.toObject()

      delete (userResponse as any).password

      return {
        "ok": true,
        "user": userResponse,
        "token": this.getToken(userResponse)
      };
    } else {
      throw new UnauthorizedException({
        "ok": false,
        "msg": "Contraseña incorrecta"
      })
    }
  }

  async register(register: RegisterDTO) {


    const userFound = await this.userModel.findOne({ email: register.email }).select('+password name email')
    if (userFound) {
      throw new BadRequestException({
        "ok": false,
        "msg": "Ya existe un usuario con ese correo"
      })
    }

    register.password = encriptarPassword(register.password);
    const user = await this.userModel.create(register);

    if (!user) throw new InternalServerErrorException({
      "ok": false,
      "msg": "Hubo un error.Consulte con el administrador."
    })

    const userResponse = user.toObject()
    delete (userResponse as any).password

    return {
      "ok": true,
      "user": userResponse,
      "token": this.getToken(user),
      "msg": "Usuario registrado correctamente"
    };


  }

  refresh(user: User) {
   
    return {
      "ok": true,
      user,
      token: this.getToken(user)
    };
  }

  private getToken(user: User) {
    return this.jwtService.sign({
      email: user.email,
      name: user.name
    })
  }

}
