import * as express from 'express';
import { ParsedQs } from 'qs';

export type ENV = 'development' | 'test' | 'production';

export interface TypedExpressQuery<T extends ParsedQs> extends express.Request {
  query: T;
}
