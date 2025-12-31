package com.monespaceformation.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "inscriptions") // C'est l'équivalent de @Entity pour Mongo
public class Inscription {

    @Id
    private String id; // Mongo utilise des String (ex: "65a4b...") pour les ID

    private Long userId;      // On garde Long pour correspondre à tes ID actuels
    private Long formationId;
    private Long sessionId;
    
    private LocalDate dateInscription;
    private String status;

    public Inscription() {}

    public Inscription(Long userId, Long formationId, Long sessionId) {
        this.userId = userId;
        this.formationId = formationId;
        this.sessionId = sessionId;
        this.dateInscription = LocalDate.now();
        this.status = "VALIDÉ";
    }

    // --- GETTERS ET SETTERS ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public Long getFormationId() { return formationId; }
    public void setFormationId(Long formationId) { this.formationId = formationId; }
    
    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
    
    public LocalDate getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDate dateInscription) { this.dateInscription = dateInscription; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}