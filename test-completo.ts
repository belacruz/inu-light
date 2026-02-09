import { inu } from './src/index.js';

// 1. Definição do Schema Rígido
const messageSchema = inu.object({
  id: inu.number(),
  // Agora o status NÃO aceita qualquer string.
  // Ele é um "OU" de valores exatos (Literais).
  status: inu.union([inu.literal('sent'), inu.literal('received')]),
  // Tupla para coordenadas: [latitude, longitude]
  location: inu.tuple([inu.number(), inu.number()]),
  // Array que aceita uma mistura de strings e números
  tags: inu.array([inu.union([inu.string(), inu.number()])]),
});

// --- CASO 1: SUCESSO ---
const validData = {
  id: 101,
  status: 'sent', // 'sent' é um dos literais permitidos
  location: [-23.5505, -46.6333],
  tags: ['urgente', 1],
};

console.log('--- Testando Dados Válidos (Literal + Union + Tuple) ---');
const result1 = messageSchema.parse(validData);

if (result1.success) {
  console.log('✅ Tudo ok! O sistema reconheceu os literais corretamente.');
  console.log(JSON.stringify(result1.value, null, 2));
}

// --- CASO 2: ERRO DE LITERAL ---
const invalidData = {
  id: 102,
  status: 'pending', // Erro! 'pending' não está na nossa union de literais
  location: [-23.5505, -46.6333],
  tags: ['trabalho'],
};

console.log('\n--- Testando Erro de Literal (Status Inválido) ---');
const result2 = messageSchema.parse(invalidData);

if (!result2.success) {
  console.log('❌ Erro detectado (como esperado):');
  // Aqui você verá a união dos erros que programamos no union.ts e literal.ts
  console.log(result2.error);
}
