import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import { PasswordDTO } from './dto/update-password.dto';
import { User } from './users.entity';
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async createUser(createUserDto: CreateUserDTO): Promise<User> {
    // const { email, password } = createUserDto;

    // const user = new User();
    // user.email = email;
    // user.password = password;

    // await user.save();
    // return user;

    const user: Partial<User> = { ...createUserDto };
    return await this.save(user);
  }

  public async editPassword(pw: PasswordDTO, user: User){
    user.password = await bcrypt.hash(pw.password, 10);
    const {password, ...editedUser} = await this.save(user);
    return editedUser;
  }
}
