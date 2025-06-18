import {
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
        throw new UnauthorizedException('Authentication token missing');
      }
      const decode: any = await jwt.verify(token, process.env.SECRET_KEY!);
      if (!decode) {
        throw new UnauthorizedException('Authentication token missing');
      }
      //   req.id = decode.userId;
      //   console.log(decode);
      //   let id = decode.userId;
      req['userId'] = decode.userId;
      next();
    } catch (error) {
      console.log(error);
    }
  }
}
