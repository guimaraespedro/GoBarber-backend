import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'JhonDoe@email.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jhon Doe');
  });

  it('should not be able to show the profile for non existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'user.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
