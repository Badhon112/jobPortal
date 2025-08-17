import { Body, Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, Login, Register } from './dto/user.create.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/user.update.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UserServices: UserService) {}

  //   @Get()
  //   getAllName() {
  //     return this.UserServices.getName();
  //   }

  //   @Post()
  //   register(@Body() CreateUserDto: CreateUserDto) {
  //     console.log(CreateUserDto);
  //   }

  @Post('signin')
  register(@Body() Register: Register) {
    return this.UserServices.register(Register);
  }

  @Post('login')
  login(@Body() Login: Login, @Res() res: Response) {
    // console.log('Login Controller is Called');

    return this.UserServices.login(Login, res);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    return this.UserServices.logout(res);
  }

  @Patch('updateProfile')
  updateProfile(@Body() UpdateUserDto: UpdateUserDto, @Req() req: Request) {
    return this.UserServices.updateProfile(UpdateUserDto, req['userId']);
  }
}
