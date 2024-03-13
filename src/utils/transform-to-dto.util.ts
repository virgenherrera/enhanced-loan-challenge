import { plainToInstance } from 'class-transformer';

export function transformToDto<T>(
  obj: unknown,
  dto: new (...args: any[]) => T,
): T {
  return plainToInstance(dto, obj, { excludeExtraneousValues: true });
}
