import { Schema } from '../types/schema.js';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isSchema(value: unknown): value is Schema<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'parse' in value &&
    typeof (value as { parse?: unknown }).parse === 'function'
  );
}