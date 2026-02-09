import { inu } from './src/index.js';
import type { ShapeToType } from './src/index.js';

const userSchema = inu.object({
  name: inu.string(),
  age: inu.number(),
  settings: inu.object({
    isAdmin: inu.boolean(),
    permissions: inu.array(inu.string()),
  }),
  scores: inu.array(inu.array(inu.number())),
});

type User = ShapeToType<typeof userSchema>;

const mockData = {
  name: 'Felipe',
  age: 25,
  settings: {
    isAdmin: true,
    permissions: ['read', 'write'],
  },
  scores: [
    [10, 'oito'],
    [9, 7],
  ],
};

const result = userSchema.parse(mockData);

if (result.success === true) {
  console.log('✅ Sucesso! Os dados estão íntegros.');
  console.log('Valor validado:', JSON.stringify(result.value, null, 2));
} else {
  console.error('❌ Erro de Validação:', result.error);
}
