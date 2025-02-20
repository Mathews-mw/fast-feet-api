import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { FastifyRequest } from 'fastify';
import type { MultipartFile } from '@fastify/multipart';

import { BadRequestError } from '@/core/errors/bad-request-errors';

interface IBodyRequest {
	file: MultipartFile;
}

export async function uploadPreHandler(request: FastifyRequest) {
	const bodyData = (await request.body) as IBodyRequest | undefined;

	if (!bodyData) {
		throw new BadRequestError('Please, provide a file');
	}
	const file = bodyData.file;

	try {
		if (file) {
			const bufferFile = await file.toBuffer();
			const fileName = `${Date.now()}_${file.filename}`;

			const filePath = path.resolve(cwd(), 'tmp', 'uploads', fileName);

			await fs.writeFileSync(filePath, bufferFile);

			request.fileName = fileName;
			request.filePath = filePath;
		}
	} catch (error) {
		console.log('Upload Pre Handler Error: ', error);
		throw error;
	}
}
