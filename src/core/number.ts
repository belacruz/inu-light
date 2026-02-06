import { Schema, ParseResult } from '../types/schema.js';

export const number = (): Schema<number> => {
  return {
    parse(value: unknown): ParseResult<number> {
      return typeof value === 'number'
        ? { success: true, value }
        : { success: false, error: 'Number Expected' };
    },
  };
};
