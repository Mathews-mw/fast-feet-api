import { IPasswordHasher } from '@/domains/main/application/cryptography/IPasswordHasher';

export class FakerPasswordHasher implements IPasswordHasher {
	async hash(plain: string): Promise<string> {
		return plain.concat('-hashed');
	}

	async compare(plain: string, hash: string): Promise<boolean> {
		return plain.concat('-hashed') === hash;
	}
}
