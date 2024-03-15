import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findByUserName(username);

      if (!user) throw new HttpException('User not found.', 404);

      if (!(await bcrypt.compare(password, user.password)))
        throw new UnauthorizedException('Invalid credential');

      return {
        access_token: await this.jwtService.signAsync({
          _id: user._id,
          roles: user.roles,
          fullName: `${user.first_name} ${user.last_name}`,
        }),
      };
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }
}
