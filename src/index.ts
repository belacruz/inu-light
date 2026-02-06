import { string } from './core/string.js';
import { number } from './core/number.js';
import { object } from './core/object.js';

export const inu = {
  string,
  number,
  object,
};

export * from './types/schema.js';
export type { ShapeToType } from './core/object.js';
