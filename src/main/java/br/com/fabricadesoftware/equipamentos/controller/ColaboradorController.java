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


    @PostMapping("/colaboradores/create")
    public Colaborador createColaborador(@RequestBody Colaborador colaborador){
        return colaboradorService.createColaborador(colaborador);
    }

    @GetMapping("/colaboradores")
    public List<Colaborador> findAllColaboradores() {
        return colaboradorService.findColaborador();
    }

    @DeleteMapping("/colaboradores/delete/id/{id}")
    public void deleteColaborador(@PathVariable int id) {
        colaboradorService.deleteColaborador(id);
    }
    @PutMapping("/colaboradores/update")
    public void updateColaborador(@RequestBody Colaborador colaborador) {
        colaboradorService.updateColaborador(colaborador);
    }






}
