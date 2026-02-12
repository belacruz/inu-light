import { inu } from '../src/index.ts'; // Aponte para o seu entry point local

const vendasSchema = inu.object({
  id: inu.string(),
  nome: inu.string(),
  preco: inu.number(),
  status: inu.union([
    inu.literal('processando'),
    inu.literal('pago'),
    inu.literal('falha'),
  ]),
  pagamento: inu.union([
    inu.literal('boleto'),
    inu.literal('pix'),
    inu.literal('cartao'),
  ]),
  parcelas: inu.number().nullable(),
  data: inu.string(),
});

// TESTE DE TIPAGEM (Inference)
// Passe o mouse sobre 'Venda' para ver se o status/pagamento são literais
type Venda = ReturnType<typeof vendasSchema.parse>;

// TESTE DE EXECUÇÃO (Runtime)
const mockData = {
  id: '01H3YYPNY11R4RH7W77VSJXYRW',
  nome: 'Diogo',
  preco: 648,
  status: 'processando',
  pagamento: 'boleto',
  parcelas: null,
  data: '2025-11-14 07:30:18',
};

const result = vendasSchema.parse(mockData);

if (result.success) {
  console.log('✅ Validação passou com sucesso!');
  console.log('Dados:', result.value);
} else {
  console.error('❌ Falha na validação:', result.error);
}

if (result.success) {
  console.log("✅ Validação passou com sucesso!");
  
  const status = result.value.status; 
  

}