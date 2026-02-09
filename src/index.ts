import { string } from './core/string.js';
import { number } from './core/number.js';
import { boolean } from './core/boolean.js';
import { object } from './core/object.js';
import { array } from './core/array.js';
import { tuple } from './core/tuple.js';
import { union } from './core/union.js';
import { literal } from './core/literal.js';

export const inu = {
  string,
  number,
  boolean,
  object,
  array,
  tuple,
  union,
  literal,
};

export type { Schema, ParseResult } from './types/schema.js';
export type { ShapeToType } from './core/object.js';
