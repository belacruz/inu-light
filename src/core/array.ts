import { Schema, ParseResult } from '../types/schema.js';
import { isArray } from '../utils/guards.js';

export class InuArray<T> extends Schema<T[]> {
  private itemSchema: Schema<T>;

  constructor(itemSchema: Schema<T>) {
    super();
    this.itemSchema = itemSchema;
  }

  parse(value: unknown): ParseResult<T[]> {
    if (!isArray(value)) {
      return {
        success: false,
        error: 'Array Expected',
      };
    }

    const validatedArray: T[] = [];

    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const result = this.itemSchema.parse(item);

      if (result.success === false) {
        return {
          success: false,
          error: `Invalid item at index ${i}: ${result.error}`,
        };
      }

      validatedArray.push(result.value);
    }

    return {
      success: true,
      value: validatedArray,
    };
  }
}

export function array<T>(itemSchema: Schema<T>): Schema<T[]> {
  return new InuArray<T>(itemSchema);
}
