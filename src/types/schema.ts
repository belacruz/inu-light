export type ParseResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export abstract class Schema<T> {
  abstract parse(value: unknown): ParseResult<T>;

  optional(): Schema<T | undefined> {
    if (this instanceof InuOptional) {
      return this;
    }
    return new InuOptional(this);
  }
  nullable(): Schema<T | null> {
    if (this instanceof InuNullable) return this;
    return new InuNullable(this);
  }
}

export type NestedShape = {
  [k: string]: Schema<unknown> | NestedShape;
};

class InuOptional<T> extends Schema<T | undefined> {
  constructor(private innerSchema: Schema<T>) {
    super();
  }

  parse(value: unknown): ParseResult<T | undefined> {
    if (value === undefined) {
      return { success: true, value: undefined };
    }

    return this.innerSchema.parse(value);
  }
}

class InuNullable<T> extends Schema<T | null> {
  constructor(private innerSchema: Schema<T>) {
    super();
  }

  parse(value: unknown): ParseResult<T | null> {
    if (value === null) {
      return { success: true, value: null };
    }

    return this.innerSchema.parse(value);
  }
}
