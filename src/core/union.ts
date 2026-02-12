import { Schema, ParseResult } from '../types/schema.js';

export class InuUnion<T> extends Schema<T> {
  private readonly schemas: ReadonlyArray<Schema<T>>;

  constructor(schemas: ReadonlyArray<Schema<T>>) {
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
      error: `Union error: Data does not match any allowed types.`,
    };
  }
}

export function union<U>(schemas: ReadonlyArray<Schema<U>>): Schema<U> {
  return new InuUnion<U>(schemas);
}
