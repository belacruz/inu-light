import { Schema, ParseResult } from '../types/schema.js';

export class InuNumber extends Schema<number> {
  parse(value: unknown): ParseResult<number> {
    if (typeof value === 'number' && !isNaN(value)) {
      return {
        success: true,
        value,
      };
    }

    return {
      success: false,
      error: 'Number Expected',
    };
  }
}

export function number(): Schema<number> {
  return new InuNumber();
}
