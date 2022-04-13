import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindaAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindaAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: ICreateUserDTO): Promise<User>;
}
