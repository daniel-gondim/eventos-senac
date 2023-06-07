package br.com.fabricadesoftware.equipamentos.entity;

public class Colaborador {
    private Integer id;
    private String nome;
    private TipoColaborador tipoColaborador;

    public Colaborador() {
        
    }

    public Colaborador(Integer id, String nome, TipoColaborador tipoColaborador) {
        this.id = id;
        this.nome = nome;
        this.tipoColaborador = tipoColaborador;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoColaborador getTipoColaborador() {
        return tipoColaborador;
    }

    public void setTipoColaborador(TipoColaborador tipoColaborador) {
        this.tipoColaborador = tipoColaborador;
    }
}
