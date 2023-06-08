package br.com.fabricadesoftware.equipamentos.service;

import br.com.fabricadesoftware.equipamentos.entity.Local;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocalService {
    List<Local> listaLocais;
    int idAtual;
    public LocalService() {
        this.listaLocais = new ArrayList<>();
        this.idAtual = 1;
    }



    /**
     * Método responsável por adicionar um local na lista
     */
    public Local createLocal(Local local) {
        //define a id do local criado
        local.setId(this.idAtual);
        this.idAtual++;
        listaLocais.add(local);
        return local;
    }

    /**
     * Método responsável por criar uma lista de locais na lista
     */

    public List<Local> findLocal() {
        return listaLocais;
    }

    /**
     * Método responsável por deletar um local na lista
     */
    public void deleteLocal(int id) {
        for (Local local : listaLocais) {
            if (local.getId() == id)
                listaLocais.remove(local);
            break;
        }
    }

    /**
     * Método responsável por atualizar informações de um equipamento na lista
     */
    public Local updateLocal(int id, Local local) {
        //para cada objeto local na lista listaLocais
        for (Local localExistente : listaLocais) {
            // se o id do objeto local for igual ao id
            if (localExistente.getId() == id) {
                localExistente.setNome(local.getNome());
                // atualiza observação
                localExistente.setObservacao(local.getObservacao());
                // devolve objeto atualizado
                return localExistente;
            }
        }
        return null;
    }
}