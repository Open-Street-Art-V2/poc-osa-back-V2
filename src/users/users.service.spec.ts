import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDTO } from './dto/create-user-dto';

describe('UsersService', () => {
  let service;
  let repository;

  const mockUsersRepository = () => ({
    createUser: jest.fn(),
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: mockUsersRepository,
        },
      ],
    }).compile();
    service = await module.get<UsersService>(UsersService);
    repository = await module.get<UsersRepository>(UsersRepository);
  });

  describe('CreateUser', () => {
    it('Should save a user in the data base', async () => {
      repository.createUser.mockResolvedValue('SomeUser');
      expect(repository.createUser).not.toHaveBeenCalled();

      const createUserDto: CreateUserDTO = {
        email: 'test@test.fr',
        password: '1234',
      };
      const result = await service.createUser(createUserDto);
      expect(repository.createUser).toHaveBeenLastCalledWith(createUserDto);
      expect(result).toEqual('SomeUser');
    });
  });

  describe('getUserByLogin', () => {
    it('should retrieve a user with an email', async () => {
      const email = 'test@test.fr';
      const mockUser = {
        email,
        password: '9876',
      };
      repository.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await service.getUserByLogin(email);
      expect(result).toEqual(mockUser);

      const param = {
        where: { email },
      };
      expect(repository.findOne).toHaveBeenCalledWith(param);
    });

    it('throws an error as a user is not found', () => {
      repository.findOne = jest.fn().mockResolvedValue(null);
      expect(service.getUserByLogin('test@test.fr')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
