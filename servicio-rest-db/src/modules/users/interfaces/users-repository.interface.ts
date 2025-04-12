import { RegisterCustomerDto } from '../dtos/register-customer.dto';
import type { User } from '../entities/user.entity';

export interface IUsersRepository {
  createUser(user: RegisterCustomerDto): Promise<User>;
}
