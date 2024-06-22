import { registerAs } from '@nestjs/config';
import { toNumber } from 'lodash';

import { IConfigs } from '@/common/interfaces';

export default registerAs('app', (): IConfigs['app'] => ({
  port: toNumber(process.env.NEST_PORT || 3012),
  documentationEnable: process.env.DOCUMENTATION_ENABLE === 'true'
}));
