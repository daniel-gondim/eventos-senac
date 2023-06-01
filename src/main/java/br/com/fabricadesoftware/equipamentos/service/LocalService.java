package br.com.fabricadesoftware.equipamentos.service;

import br.com.fabricadesoftware.equipamentos.entity.Equipamento;
import br.com.fabricadesoftware.equipamentos.entity.Local;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocalService {
    List<Local> objeto = new ArrayList<>();

    /**
     * Método responsável por adicionar um local na lista
     */
    public Local createLocal(Local local) {
        objeto.add(local);
        return objeto.get(0);
    }
    /**
     * Método responsável por criar uma lista de locais na lista
     */

    public List<Local> findLocal() {
        return objeto;
    }

    /**
     * Método responsável por deletar um local na lista
     */
    public void deleteLocal(int id) {
        for (Local local : objeto) {
            if (local.getId() == (id))
                objeto.remove(local);
            break;
        }
    }

    /**
     * Método responsável por atualizar informações de um equipamento na lista
     */
    public void updateLocal(Local local) {
        for (Local local1 : objeto) {
            if (local1.getId() == (local1.getId()))
                deleteLocal(local.getId());
            createLocal(local);
        }
    }
}
