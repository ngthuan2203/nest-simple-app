import { registerAs } from '@nestjs/config';
import { toNumber } from 'lodash';

import { IConfigs } from '@/common/interfaces';

export default registerAs('database', (): IConfigs['database'] => ({
  host: process.env.DB_HOST || 'localhost',
  port: toNumber(process.env.DB_PORT || 3306),
  name: process.env.DB_DATABASE || 'koobai_portal',
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'admin',
  logging: process.env.DB_LOGS === 'true'
}));
