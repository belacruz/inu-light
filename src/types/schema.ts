export type ParseResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export interface Schema<T> {
  parse(value: unknown): ParseResult<T>;
}

export type NestedShape = {
  [k: string]: Schema<unknown> | NestedShape;
};
