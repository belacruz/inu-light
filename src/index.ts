import { string } from './core/string.js';
import { number } from './core/number.js';
import { boolean } from './core/boolean.js';
import { object } from './core/object.js';
import { array } from './core/array.js';

export const inu = {
  string: string,
  number: number,
  boolean: boolean,
  object: object,
  array: array,
};

export type { Schema, ParseResult } from './types/schema.js';
export type { ShapeToType } from './core/object.js';
