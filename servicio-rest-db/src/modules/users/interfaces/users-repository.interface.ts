import type { MongooseUser } from '../../../common/types/mongoose-user.type';
import type { RegisterCustomerDto } from '../dtos/register-customer.dto';

export interface IUsersRepository {
  createUser(user: RegisterCustomerDto): Promise<MongooseUser>;

  getUserByDocument(document: string): Promise<MongooseUser>;
}
