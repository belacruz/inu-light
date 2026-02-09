import { Schema, ParseResult } from '../types/schema.js';
import { isBoolean } from '../utils/guards.js';

export class InuBoolean extends Schema<boolean> {
  constructor() {
    super();
  }

  parse(value: unknown): ParseResult<boolean> {
    if (isBoolean(value)) {
      return {
        success: true,
        value: value,
      };
    } else {
      return {
        success: false,
        error: 'Boolean Expected',
      };
    }
  }
}

export function boolean(): Schema<boolean> {
  return new InuBoolean();
}
