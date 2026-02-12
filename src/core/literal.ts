import { Schema, ParseResult } from '../types/schema.js';

export class InuLiteral<T> extends Schema<T> {
  constructor(readonly expectedValue: T) {
    super();
  }

  parse(value: unknown): ParseResult<T> {
    if (value === this.expectedValue) {
      return {
        success: true,
        value: this.expectedValue,
      };
    }

    return {
      success: false,
      error: `Expected literal ${JSON.stringify(
        this.expectedValue,
      )}, but got ${JSON.stringify(value)}`,
    };
  }
}

export function literal<T extends string | number | boolean>(
  value: T,
): Schema<T> {
  return new InuLiteral<T>(value);
}
