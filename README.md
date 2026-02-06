# inu-light

A lightweight, zero-dependency schema validation library for TypeScript and JavaScript.

## Design philosophy

inu-light focuses on predictable schemas and strict typing, avoiding magic behavior and unnecessary runtime dependencies.

## Features

- **Zero Dependencies**: Minimum footprint for your project.
- **Type Safe**: Automatically infers TypeScript types from your schemas without using explicit any.
- **ESM Native**: Built for modern environments.
- **Lightweight**: Focused on core validation primitives.

## Installation

```
npm install inu-light
```

## Usage

### Basic Example

Define a schema and validate data against it. The `parse` method returns a result object containing either the validated data or an error message.

```typescript
import { inu } from 'inu-light';

const userSchema = inu.object({
  name: inu.string(),
  age: inu.number(),
  isActive: inu.boolean(),
});

const result = userSchema.parse({
  name: 'John Doe',
  age: 30,
  isActive: true,
});

if (result.success) {
  console.log(result.value); // Type-safe data
} else {
  console.error(result.error);
}
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

- `inu.string()`: Validates that the input is a string.
- `inu.number()`: Validates that the input is a number.
- `inu.boolean()`: Validates that the input is a boolean.

### Complex Types

- `inu.object(shape)`: Validates an object based on the provided shape.

## Development

### Build

To compile the library from source:

```
npm run build
```

### Testing

To run local tests during development:

```
npx tsx test-local.ts
```

## License

MIT
