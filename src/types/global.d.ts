import 'express';
// import { UserInfo } from '#types/oidcType';
// XXX: Тут нужны какие-то фиксы

interface Locals {
  // user?: UserInfo;
}

declare module 'express' {
  export interface Response {
    locals: Locals;
  }
}
