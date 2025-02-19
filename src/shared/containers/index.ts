import { container } from 'tsyringe';

import containerKeysConfig from '@/config/container-keys-config';
import { PrismaUsersRepository } from '@/infra/database/repositories/prisma-users-repository';
import { PrismaOrdersRepository } from '@/infra/database/repositories/prisma-orders-repository';
import { PrismaRecipientsRepository } from '@/infra/database/repositories/prisma-recipients-repository';
import { PrismaAttachmentsRepository } from '@/infra/database/repositories/prisma-attachments-repository';

const { repositories } = containerKeysConfig;

container.registerSingleton(repositories.users_repository, PrismaUsersRepository);
container.registerSingleton(repositories.orders_repository, PrismaOrdersRepository);
container.registerSingleton(repositories.recipients_repository, PrismaRecipientsRepository);
container.registerSingleton(repositories.attachments_repository, PrismaAttachmentsRepository);
