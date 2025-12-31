package com.monespaceformation.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sessions")
public class SessionFormation {

    @Id
    private String id; // L'identifiant unique de la session

    private String dates;
    private String lieu;
    private int placesTotales;   // Ex: 12
    private int placesReservees; // Ex: 0 au début, puis 1, 2...

    public SessionFormation() {}

    public SessionFormation(String dates, String lieu, int placesTotales) {
        this.dates = dates;
        this.lieu = lieu;
        this.placesTotales = placesTotales;
        this.placesReservees = 0; // Au début, personne n'est inscrit
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDates() { return dates; }
    public void setDates(String dates) { this.dates = dates; }

    public String getLieu() { return lieu; }
    public void setLieu(String lieu) { this.lieu = lieu; }

    public int getPlacesTotales() { return placesTotales; }
    public void setPlacesTotales(int placesTotales) { this.placesTotales = placesTotales; }

    public int getPlacesReservees() { return placesReservees; }
    public void setPlacesReservees(int placesReservees) { this.placesReservees = placesReservees; }
}