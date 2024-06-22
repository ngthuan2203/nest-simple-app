import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { ResponseInterceptor } from '../../interceptors';

export const ApiResponse = <T>(message: string) => {
  return applyDecorators(
    UseInterceptors(ResponseInterceptor<T>),
    SetMetadata('RESPONSE_MESSAGE_META_KEY', message)
  );
};
