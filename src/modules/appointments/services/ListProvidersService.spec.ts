import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'JhonDoe@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jhon tre',
      email: 'Jhontre@email.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'LoggedUser',
      email: 'LoggedUser@email.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
