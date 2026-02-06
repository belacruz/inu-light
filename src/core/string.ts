import { Schema, ParseResult } from '../types/schema.js';

export const string = (): Schema<string> => {
  return {
    parse(value: unknown): ParseResult<string> {
      return typeof value === 'string'
        ? { success: true, value }
        : { success: false, error: 'String Expected' };
    },
  };
};