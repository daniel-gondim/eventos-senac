package br.com.fabricadesoftware.equipamentos;

import br.com.fabricadesoftware.equipamentos.entity.Equipamento;
import br.com.fabricadesoftware.equipamentos.service.EquipamentoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class EquipamentosApplicationTests {

		@Autowired
		private EquipamentoService equipamentoService;

		@Test
		void testSalvarEquipamento() {
			// Crie um objeto de equipamento para teste
			Equipamento equipamento = new Equipamento();
			equipamento.setId(1);
			equipamento.setObservacao("pilha AAA");
			equipamento.setDescricao("Microfone");

			// Chame um método do serviço e verifique o resultado esperado
			Equipamento resultado = equipamentoService.createEquipamento(equipamento);
			assertEquals("Microfone", resultado.getDescricao());
			assertEquals(1, resultado.getId());
			assertEquals("pilha AAA", resultado.getObservacao());
		}

		// Adicione mais métodos de teste conforme necessário
	}
