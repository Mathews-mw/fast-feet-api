import containerKeysConfig from '@/config/container-keys-config';
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository';

import { container } from 'tsyringe';

const { repositories } = containerKeysConfig;

container.registerSingleton(repositories.users_repository, PrismaUsersRepository);
