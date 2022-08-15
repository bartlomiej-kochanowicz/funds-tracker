import { User } from '@prisma/client';

export const userStub = (): User => ({
  id: 'a891193e-bc85-4474-8cfb-100e8da3088e',
  createdAt: new Date('07 Dec 2000 01:23:00 GMT'),
  email: 'bart.koch@gmail.com',
  password: 'qwe123qwe',
  rtHash: null,
});
