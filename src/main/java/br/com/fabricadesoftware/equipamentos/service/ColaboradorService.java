package br.com.fabricadesoftware.equipamentos.service;

import br.com.fabricadesoftware.equipamentos.entity.Colaborador;
import br.com.fabricadesoftware.equipamentos.entity.Equipamento;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ColaboradorService {
    // cria um arrayList para armazenar os colaboradores
    List<Colaborador> colaboradores = new ArrayList<>();

    /**
     * Método responsável por adicionar um colaborador na lista
     */
    public Colaborador createColaborador(Colaborador colaborador) {
        if (!colaboradores.contains(colaborador)) {
            // adiciona colaborador à coleção objeto
            colaboradores.add(colaborador);
            // retorna primeiro elemento da coleção
        }
        return colaboradores.get(0);
    }

    /**
     * Método responsável por criar uma lista de colaboradores
     */
    public List<Colaborador> findColaborador() {
        return colaboradores;
    }

    /**
     * Método responsável por deletar um colaborador
     */
    public void deleteColaborador(int id) {
        for (Colaborador colaborador : colaboradores) {
            if (colaborador.getId() == (id))
                colaboradores.remove(colaborador);
            break;
        }
    }

    /**
     * Método responsável por atualizar informações de um colaborador
     */
    public void updateColaborador(Colaborador colaborador) {
        for (int i = 0; i < colaboradores.size(); i++) {
            Colaborador c = colaboradores.get(i);
            if (c.getId() == colaborador.getId()) {
                colaboradores.set(i, colaborador);
                break;
            }
        }
    }
}