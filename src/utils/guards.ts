import { Schema } from '../types/schema.js';

export function isSchema(value: unknown): value is Schema<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'parse' in value &&
    typeof (value as { parse?: unknown }).parse === 'function'
  );
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}
