import 'express';
import { JWTPayload } from '#types/jwtType';

interface MyLocals {
  user?: JWTPayload;
}

declare module 'express' {
  export interface Response {
    locals: MyLocals;
  }
}
