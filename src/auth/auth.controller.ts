import { Body, Controller, Get, Post,  Request,  UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/RegisterDTO.dto';
import { LoginDTO } from './dto/LoginDTO.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('')
  login(@Body() login: LoginDTO) {
    return this.authService.login(login);
  }

  @Post('new')
  register(@Body() register: RegisterDTO) {
    return this.authService.register(register);
  }

  @Get('renew')
  renewtoken() {  
    return this.authService.refresh();
  }

  @Get('test')
  @UseGuards(AuthGuard())  
  test(@Request() req:any) {
    return req.user.name;
  }
}
