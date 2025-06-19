import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class IsAuthenticationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('Middleware called!'); // Add this for testing
    try {
      const token = req.cookies?.token;
      if (!token) {
        res.status(401).json({
          message: 'User Not Authenticited',
          success: false,
        });
      }
      const decode: any = await jwt.verify(token, process.env.SECRET_KEY!);
      if (!decode) {
        res.status(401).json({
          message: 'Invalid Token',
          success: false,
        });
      }
      req['userId'] = decode.userId;
      next();
    } catch (error) {
      console.log(error);
    }
  }
}
