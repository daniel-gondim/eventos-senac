package br.com.fabricadesoftware.equipamentos.controller;

import br.com.fabricadesoftware.equipamentos.entity.Equipamento;
import br.com.fabricadesoftware.equipamentos.entity.Local;
import br.com.fabricadesoftware.equipamentos.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class LocalController {

    @Autowired
    private LocalService localService;

    @GetMapping("/locais")
    public List<Local> findAllLocais() {
        return localService.findLocal();
    }

    @PostMapping("/locais/create")
    public Local createLocal(@RequestBody Local local){
        return localService.createLocal(local);
    }
    @DeleteMapping("/locais/delete/id/{id}")
    public void deleteLocal(@PathVariable int id) {
        localService.deleteLocal(id);
    }
    @PutMapping("/locais/update")
    public void updateLocais(@RequestBody Local local) {
        localService.updateLocal(local);
    }

}
