import { inu } from './src/index.js';

const userSchema = inu.object({
  name: inu.string(),
  age: inu.number(),
});

const result = userSchema.parse({ name: 'Bela', age: 25 });

if (result.success) {
  console.log('✅ Funcionou!', result.value);
} else {
  console.log('❌ Erro:', result.error);
}
