package br.com.fabricadesoftware.equipamentos.controller;

import br.com.fabricadesoftware.equipamentos.entity.Colaborador;
import br.com.fabricadesoftware.equipamentos.service.ColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ColaboradorController {

    @Autowired
    private ColaboradorService colaboradorService;

    @GetMapping("/colaboradores")
    public List<Colaborador> findAllColaboradores() {
        return colaboradorService.findColaborador();
    }

    @DeleteMapping("/colaboradores/delete/id/{id}")
    public void deleteColaboradores(@PathVariable int id) {
        colaboradorService.deleteColaborador(id);
    }
    @PutMapping("/colaboradores/update")
    public void updateEquipamento(@RequestBody Colaborador colaborador) {
        colaboradorService.updateColaborador(colaborador);
    }






}
