export type ParseResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export abstract class Schema<T> {
  abstract parse(value: unknown): ParseResult<T>;

  optional(): void {
    console.log('Este método será herdado por todos!');
  }
}

export type NestedShape = {
  [k: string]: Schema<unknown> | NestedShape;
};
