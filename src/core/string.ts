import { Schema, ParseResult } from '../types/schema.js';
import { isString } from '../utils/guards.js';

export class InuString extends Schema<string> {
  constructor() {
    super();
  }
  parse(value: unknown): ParseResult<string> {
    if (isString(value)) {
      return { success: true, value };
    }

    return { success: false, error: 'String Expected' };
  }
}

export const string = (): Schema<string> => {
  return new InuString();
};