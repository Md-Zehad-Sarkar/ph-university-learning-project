import { z } from 'zod';

export const userValidation = z.object({
  password: z
    .string()
    .max(12, 'password can not more then 12 character')
    .min(6, 'password can not more then 6 character'),
});
