import { Schema, ParseResult } from '../types/schema.js';
import { isArray } from '../utils/guards.js';

export class InuTuple<T extends unknown[]> extends Schema<T> {
  private schemas: { [K in keyof T]: Schema<T[K]> };

  constructor(schemas: { [K in keyof T]: Schema<T[K]> }) {
    super();
    this.schemas = schemas;
  }

  parse(value: unknown): ParseResult<T> {
    if (!isArray(value)) {
      return {
        success: false,
        error: 'Expected an array for tuple validation',
      };
    }

    if (value.length !== this.schemas.length) {
      return {
        success: false,
        error: `Tuple length mismatch: expected ${this.schemas.length} items, but got ${value.length}`,
      };
    }

    const validatedTuple = [] as unknown as T;

    for (let i = 0; i < this.schemas.length; i++) {
      const result = this.schemas[i].parse(value[i]);

      if (!result.success) {
        return {
          success: false,
          error: `Invalid tuple item at index ${i}: ${result.error}`,
        };
      }

      validatedTuple[i] = result.value;
    }

    return { success: true, value: validatedTuple };
  }
}

export function tuple<T extends unknown[]>(schemas: {
  [K in keyof T]: Schema<T[K]>;
}): Schema<T> {
  return new InuTuple<T>(schemas);
}
