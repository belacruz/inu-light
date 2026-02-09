import { Schema, ParseResult, NestedShape } from '../types/schema.js';
import { isRecord, isSchema } from '../utils/guards.js';

export type ShapeToType<S> =
  S extends Schema<infer T>
    ? T
    : {
        [K in keyof S]: S[K] extends Schema<infer T>
          ? T
          : S[K] extends Record<string, unknown>
            ? ShapeToType<S[K]>
            : never;
      };

type ParsedField<T> =
  | { key: string; success: true; value: T }
  | { key: string; success: false; error: string };

export class InuObject<S extends NestedShape> extends Schema<ShapeToType<S>> {
  constructor(private shape: S) {
    super();
  }
  parse(value: unknown): ParseResult<ShapeToType<S>> {
    if (!isRecord(value)) {
      return { success: false, error: 'Object Expected' };
    }

    const parsedFields: ParsedField<unknown>[] = [];

    for (const key in this.shape) {
      const field = this.shape[key];

      if (isSchema(field)) {
        const parsed = field.parse(value[key]);
        if (!parsed.success) {
          parsedFields.push({ key, success: false, error: parsed.error });
          continue;
        }
        parsedFields.push({ key, success: true, value: parsed.value });
      } else {
        const nestedResult = new InuObject(field as NestedShape).parse(
          value[key],
        );

        if (!nestedResult.success) {
          parsedFields.push({
            key,
            success: false,
            error: nestedResult.error,
          });
          continue;
        }
        parsedFields.push({ key, success: true, value: nestedResult.value });
      }
    }

    const failed = parsedFields.find((f) => f.success === false);

    if (failed && !failed?.success) {
      return { success: false, error: `Invalid field "${failed.key}"` };
    }

    const finalObject = parsedFields.reduce(
      (acc, field) => {
        if (field.success) {
          acc[field.key] = field.value;
        }
        return acc;
      },
      {} as Record<string, unknown>,
    );

    return { success: true, value: finalObject as ShapeToType<S> };
  }
}

export function object<S extends NestedShape>(
  shape: S,
): Schema<ShapeToType<S>> {
  return new InuObject(shape);
}
