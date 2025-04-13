import type { MongooseUser } from '../../../common/types/mogoose-user.type';
import type { RegisterCustomerDto } from '../dtos/register-customer.dto';

export interface IUsersRepository {
  createUser(user: RegisterCustomerDto): Promise<MongooseUser>;

  getUserByDocument(document: string): Promise<MongooseUser>;
}
