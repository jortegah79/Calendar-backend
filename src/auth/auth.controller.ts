import { Body, Controller, Get, Post,  Request,  UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/RegisterDTO.dto';
import { LoginDTO } from './dto/LoginDTO.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/usuario.entity';

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
  @UseGuards(AuthGuard())  

  renewtoken(@Request() request:any) {  
    const user=request.user as User;
    
    
    return this.authService.refresh(user);
  }

  @Get('test')
  @UseGuards(AuthGuard())  
  test(@Request() req:any) {
    return req.user.name;
  }
}
