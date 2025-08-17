import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/models/user.model';
import { Login, Register } from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { UpdateUserDto } from './dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async register(Register: Register) {
    try {
      const { fullName, email, phoneNumber, password, role } = Register;
      //   console.log(fullName, email, phoneNumber, password, role);
      if (!fullName || !email || !phoneNumber || !password || !role) {
        return new BadRequestException('Something is missing');
      }
      const user = await this.userModel.findOne({ email });
      if (user) {
        return {
          success: false,
          message: 'User Already Exits',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userModel.create({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: {},
      });
      return {
        data: newUser,
        success: true,
        message: 'User Created Succefully',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async login(Login: Login, res: Response) {
    try {
      const { email, password, role } = Login;
      if (!email || !password || !role) {
        return new NotFoundException('Something is Missing');
      }
      // const user = await this.userModel.findOne({ email });
      const user = await this.userModel.findOne({
        email: { $regex: new RegExp(`^${email}$`, 'i') },
      });
      // console.log(user);
      if (!user) {
        return new NotFoundException('User Not Found');
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return new NotFoundException('Incorrect Email or Password');
      }

      if (role !== user.role) {
        return new BadRequestException("Role Didn't Match");
      }

      const tokenData = {
        userId: user._id,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY!, {
        expiresIn: '1d',
      });

      return res
        .status(200)
        .cookie('token', token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'strict',
        })
        .json({
          message: `Welcome back ${user.fullName}`,
          success: true,
        });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(res: Response) {
    try {
      return res.status(200).cookie('token', '', { maxAge: 0 }).json({
        message: 'Logged Out Succefully',
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(UpdateUserDto: UpdateUserDto, userId: string) {
    try {
      const { fullName, email, phoneNumber, bio, skill } = UpdateUserDto;
      //   if (!fullName || !email || !phoneNumber || !bio || !skill) {
      //     return new BadRequestException('Something is missing');
      //   }
      let user = await this.userModel.findById(userId);

      if (!user) {
        return new NotFoundException('User Not Found');
      }

      user.fullName = fullName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.profile.bio = bio;
      user.profile.skill = skill;

      const newUser = await user.save();
      console.log(newUser);

      return {
        data: newUser,
        success: true,
        message: 'User Updated Succefully',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
