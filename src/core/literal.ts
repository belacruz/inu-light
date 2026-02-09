import { Schema, ParseResult } from '../types/schema.js';

export class InuLiteral<T> extends Schema<T> {
  private readonly expectedValue: T;

  constructor(expectedValue: T) {
    super();
    this.expectedValue = expectedValue;
  }

  parse(value: unknown): ParseResult<T> {
    if (value === this.expectedValue) {
      return {
        success: true,
        value: value as T,
      };
    }

    return {
      success: false,
      error: `Expected literal ${JSON.stringify(this.expectedValue)}, but got ${JSON.stringify(value)}`,
    };
  }
}

export function literal<T>(value: T): Schema<T> {
  return new InuLiteral<T>(value);
}
