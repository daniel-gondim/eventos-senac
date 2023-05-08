package br.com.fabricadesoftware.equipamentos.controller;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ApiController {

    public static void main(String[] args) throws Exception {

        URL url1 = new URL("localhost:8080/create");
        HttpURLConnection con = (HttpURLConnection) url1.openConnection();
        con.setRequestMethod("POST");

        con.connect();

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
    }

    public void createEquipamento() {

    }

    public void findAllEquipamentos() {

    }

    public void deleteEquipamento() {

    }

    public void updateEquipamento() {

    }
}
