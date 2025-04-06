import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/RegisterDTO.dto';
import { LoginDTO } from './dto/LoginDTO.dto';

@Injectable()
export class AuthService {

  login(login: LoginDTO) {
    return { "ok": true, "login": login, "msg": "Login" };
  }

  register(register: RegisterDTO) {
    return { "ok": true, "user": register, "msg": "register" };
  }

  refresh() {
    return { "ok": true, "msg": "refresh token" };
  }

}
