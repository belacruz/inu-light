# inu-light

A lightweight, zero-dependency schema validation library for TypeScript. Designed to improve runtime data safety with schema-driven validation and strict avoidance of the any type.

## Design philosophy

Most schema libraries are either heavy or rely on opaque runtime magic. inu-light is intentionally minimal and predictable: the schema is the single source of truth. Advanced TypeScript generics provide precise inference, so external data cannot silently break your types at runtime.

- **Zero Dependencies**: minimal footprint, no runtime bloat

- **True Type Safety**: no any in the inference engine

- **Runtime Validation**: Strict validation for primitives and nested object structures

- **ESM Native**: optimized for Vite, Webpack 5, and Next.js

### Complex Types & Modifiers

- `inu.object(shape)`: Validates an object based on the provided shape.
- `inu.array(schema)`: Validates an array of elements matching the schema.
- `inu.union([schema1, schema2])`: Validates that the input matches at least one of the provided schemas.
- `inu.literal(value)`: Validates an exact value (string, number, or boolean).
- `.optional()`: Modifier to allow `undefined`.
- `.nullable()`: Modifier to allow `null`.

## Installation

```
npm install inu-light
```

## Usage

### 1. Basic Example

The library uses the .parse() method to validate data. Instead of throwing unpredictable exceptions, it returns a result object containing either the validated data or a clear error message.

```typescript
import { inu } from 'inu-light';

const UserSchema = inu.object({
  username: inu.string(),
  priority: inu.number(),
  isAdmin: inu.boolean(),
});

const result = UserSchema.parse(apiResponse);

if (result.success) {
  // TypeScript automatically knows 'result.value' type
  console.log(result.value.username);
} else {
  console.error('Validation failed:', result.error);
}
```

### 2. Complex Types & Modifiers

inu-light handles real-world data structures with ease:

- **Optional & Nullable**: Explicitly allow undefined or null values.

- **Unions**: Validate input against multiple possible schemas.

- **Literals**: Enforce exact values (perfect for status codes or specific flags).

```typescript
const ProjectSchema = inu.object({
  id: inu.string(),
  description: inu.string().optional(), // Accepts string | undefined
  status: inu.union([inu.literal('open'), inu.literal('closed')]),
  tags: inu.array(inu.string()).nullable(), // Accepts string[] | null
});
```

### 3. Type Inference (The "No Any" Rule)

Avoid redundancy. You don't need to manually write interfaces; the schema generates them for you.

```typescript
import { inu, ShapeToType } from 'inu-light';

const ProductSchema = inu.object({
  sku: inu.string(),
  price: inu.number(),
});

// Automatically extract the TypeScript type
type Product = ShapeToType<typeof ProductSchema>;

// Resulting type: { sku: string; price: number; }
```

### Type Inference

You can extract the TypeScript type directly from a schema using `ShapeToType`.

```typescript
import { inu, ShapeToType } from 'inu-light';

const schema = inu.object({
  id: inu.number(),
});

type User = ShapeToType<typeof schema>;
```

## API Reference

### Primitives

| Method          | Description           |
| :-------------- | :-------------------- |
| `inu.string()`  | Validates a `string`  |
| `inu.number()`  | Validates a `number`  |
| `inu.boolean()` | Validates a `boolean` |

### Structural

| Method                | Description                                                 |
| :-------------------- | :---------------------------------------------------------- |
| `inu.object(shape)`   | Validates an object based on the provided shape.            |
| `inu.array(schema)`   | Validates an array where every item matches the `schema`.   |
| `inu.tuple([s1, s2])` | Validates a fixed-length array with positional types.       |
| `inu.union([s1, s2])` | Validates if the input matches at least one of the schemas. |
| `inu.literal(value)`  | Validates strict equality against the provided `value`.     |

### Modifiers (Available on all schemas)

- `.optional()`: Transforms the type to `T | undefined`.
- `.nullable()`: Transforms the type to `T | null`.

## Development

```bash
# Install dependencies
npm install

# Build (Outputs to /dist)
npm run build

# Run local tests
npx tsx test-local.ts
```

### Build

To compile the library from source:

```
npm run build
```

## License

MIT
