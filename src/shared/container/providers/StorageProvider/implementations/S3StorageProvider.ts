import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new AppError('Type not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    try {
      await this.client
        .putObject({
          Bucket: uploadConfig.config.aws.bucket,
          Key: file,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: contentType,
        })
        .promise();
    } catch (e) {
      console.log(e);
    }

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
