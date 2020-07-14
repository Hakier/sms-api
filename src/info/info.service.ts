import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

const { name, description, version } = require(resolve(process.cwd(), 'package.json'));

export interface AppInfo {
  name: string;
  description: string;
  version: string;
}

@Injectable()
export class InfoService {
  get appInfo(): AppInfo {
    return { name, description, version };
  }
}
