package br.com.fabricadesoftware.equipamentos.service;

import br.com.fabricadesoftware.equipamentos.entity.Equipamento;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipamentoService {
    List<Equipamento> objeto = new ArrayList<>();

    /**
     * Método responsável por adicionar um equipamento na lista
     */
    public Equipamento createEquipamento(Equipamento equipamento) {
        objeto.add(equipamento);
        return objeto.get(0);
    }

    /**
     * Método responsável por criar uma lista de equipamento na lista
     */

    public List<Equipamento> findEquipamento() {
        return objeto;
    }

    /**
     * Método responsável por deletar um equipamento na lista
     */
    public void deleteEquipamento(int id) {
        for (Equipamento equipamento : objeto) {
            if (equipamento.getId() == (id))
                objeto.remove(equipamento);
            break;
        }
    }

    /**
     * Método responsável por atualizar informações de um equipamento na lista
     */
    public void updateEquipamento(Equipamento equipamento) {
        for (int i = 0; i < objeto.size(); i++) {
            Equipamento e = objeto.get(i);
            if (equipamento.getId() == e.getId()) {
                objeto.set(i, equipamento);
            }
        }
    }
}