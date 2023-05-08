package br.com.fabricadesoftware.equipamentos.controller;

import br.com.fabricadesoftware.equipamentos.entity.Equipamento;
import br.com.fabricadesoftware.equipamentos.service.EquipamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/equipamento")
public class EquipamentoController {
    @Autowired
    private EquipamentoService equipamentoService;

    @GetMapping("/todos")
    public List<Equipamento> findAllEquipamentos() {
        return equipamentoService.findEquipamento();
    }

    @PostMapping("/create")
    public Equipamento createEquipamento(@RequestBody Equipamento equipamento){
        return equipamentoService.createEquipamento(equipamento);
    }
    @DeleteMapping("/delete/id/{id}")
    public void deleteEquipamento(@PathVariable int id) {
        equipamentoService.deleteEquipamento(id);
    }
    @PutMapping("/update")
    public void updateEquipamento(@RequestBody Equipamento equipamento) {
        equipamentoService.updateEquipamento(equipamento);
    }
}
