import { inu } from '../src/index.js';

// 1. O SCHEMA "INCEPTION" (Recursividade Extrema)
// Estrutura: Empresa -> Departamentos -> Equipes -> Membros -> Metadados
const inceptionSchema = inu.object({
  name: inu.string(),
  departments: inu.array(
    inu.object({
      depName: inu.string(),
      lead: inu.object({
        name: inu.string(),
        rank: inu.number().nullable()
      }).optional(),
      teams: inu.array(
        inu.object({
          teamId: inu.union([inu.string(), inu.number()]),
          members: inu.array(
            inu.object({
              username: inu.string(),
              active: inu.boolean(),
              tags: inu.array(inu.string()).nullable().optional()
            })
          )
        })
      )
    })
  )
});

// Tipagem inferida automática (o seu ShapeToType vai suar aqui!)
type InceptionType = typeof inceptionSchema extends import('../src/types/schema.js').Schema<infer T> ? T : never;

function assert(name: string, result: { success: boolean; error?: string }, expected: boolean): void {
  if (result.success === expected) {
    console.log(`✅ [PASS] ${name}`);
  } else {
    console.error(`❌ [FAIL] ${name}`);
    console.error(`   Esperado: ${expected}, Recebido: ${result.success}`);
    if (result.error) console.error(`   Erro: ${result.error}`);
  }
}

console.log("--- INICIANDO TESTE INCEPTION (RECURSIVIDADE AO LIMITE) ---");

// 2. CENÁRIO: O Labirinto Perfeito
const validDeepData = {
  name: "InuCorp",
  departments: [
    {
      depName: "Engineering",
      lead: { name: "Spooky", rank: 1 },
      teams: [
        {
          teamId: "DEV-01",
          members: [
            { username: "cat_coder", active: true, tags: ["backend", "ninja"] },
            { username: "dog_ops", active: true, tags: null }
          ]
        }
      ]
    },
    {
      depName: "Design",
      teams: [] // Array vazio é um teste importante
    }
  ]
};
assert("Cenário Profundo Válido", inceptionSchema.parse(validDeepData), true);

// 3. CENÁRIO: Erro Cirúrgico no Nível 4
// Vamos errar o tipo do 'active' dentro do terceiro membro da segunda equipe do primeiro departamento.
const deepErrorData = {
  name: "BugCorp",
  departments: [
    {
      depName: "QA",
      teams: [
        {
          teamId: 101,
          members: [
            { username: "tester1", active: true },
            { username: "tester2", active: "not_a_boolean" } // <--- O ERRO ESTÁ AQUI
          ]
        }
      ]
    }
  ]
};
const deepResult = inceptionSchema.parse(deepErrorData);
assert("Falha: Erro de tipo no 4º nível de aninhamento", deepResult, false);

// 4. CENÁRIO: O "Vazio" (Recursividade com Opcionais)
const emptyStructure = {
  name: "EmptyCorp",
  departments: []
};
assert("Sucesso: Estrutura mínima válida", inceptionSchema.parse(emptyStructure), true);

// 5. CENÁRIO: Quebrando a Union no fundo do poço
const unionFailData = {
  name: "UnionCorp",
  departments: [{
    depName: "HR",
    teams: [{
      teamId: true, // <--- ERRO: Union só aceita string ou number
      members: []
    }]
  }]
};
assert("Falha: Union inválida dentro de aninhamento", inceptionSchema.parse(unionFailData), false);

// 6. TESTE DE PERFORMANCE/STRESS (Array Grande)
const largeData = {
  name: "BigCorp",
  departments: Array.from({ length: 50 }, (_, i) => ({
    depName: `Dep ${i}`,
    teams: Array.from({ length: 10 }, (_, j) => ({
      teamId: j,
      members: [{ username: `user-${i}-${j}`, active: i % 2 === 0 }]
    }))
  }))
};
console.time("Performance");
const perfResult = inceptionSchema.parse(largeData);
console.timeEnd("Performance");
assert("Sucesso: Stress test com 500 objetos aninhados", perfResult, true);