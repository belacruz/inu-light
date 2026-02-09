import { Schema, ParseResult } from '../types/schema.js';

export class InuUnion<T> extends Schema<T> {
  private schemas: Schema<T>[];

  constructor(schemas: Schema<T>[]) {
    super();
    this.schemas = schemas;
  }

  parse(value: unknown): ParseResult<T> {
    const errors: string[] = [];

    for (const schema of this.schemas) {
      const result = schema.parse(value);
      if (result.success) {
        return result;
      }
      errors.push(result.error || 'Invalid input');
    }

    return {
      success: false,
      error: `Union error: Data does not match any of the allowed types. 
Sub-errors: [${errors.join(' | ')}]`,
    };
  }
}

export function union<T extends unknown[]>(
  schemas: [...{ [K in keyof T]: Schema<T[K]> }],
): Schema<T[number]> {
  return new InuUnion<T[number]>(schemas as Schema<T[number]>[]);
}
