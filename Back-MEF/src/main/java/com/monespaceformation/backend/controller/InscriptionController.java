package com.monespaceformation.backend.controller;

import com.monespaceformation.backend.model.Inscription;
import com.monespaceformation.backend.model.SessionFormation; // Import
import com.monespaceformation.backend.repository.InscriptionRepository;
import com.monespaceformation.backend.repository.SessionRepository; // Import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api") // J'ai raccourci un peu la racine
@CrossOrigin(origins = "http://localhost:3000")
public class InscriptionController {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private SessionRepository sessionRepository; // On a besoin d'accéder aux sessions

    // 1. Récupérer toutes les sessions (pour le Frontend)
    @GetMapping("/sessions")
    public List<SessionFormation> getAllSessions() {
        return sessionRepository.findAll();
    }

    // 2. S'inscrire (et décrémenter une place)
    @PostMapping("/inscriptions")
    public ResponseEntity<?> inscrire(@RequestBody Inscription inscription) {
        
        // A. On cherche la session concernée par son ID (envoyé depuis le front)
        // Attention: inscription.getSessionId() doit être un String maintenant
        Optional<SessionFormation> sessionOpt = sessionRepository.findById(String.valueOf(inscription.getSessionId()));

        if (sessionOpt.isPresent()) {
            SessionFormation session = sessionOpt.get();

            // B. Vérifier s'il reste de la place
            if (session.getPlacesReservees() >= session.getPlacesTotales()) {
                return ResponseEntity.badRequest().body("Désolé, cette session est complète !");
            }

            // C. Ajouter 1 aux réservations
            session.setPlacesReservees(session.getPlacesReservees() + 1);
            sessionRepository.save(session); // Sauvegarder la mise à jour de la session

            // D. Sauvegarder l'inscription
            inscription.setDateInscription(java.time.LocalDate.now());
            Inscription saved = inscriptionRepository.save(inscription);
            
            return ResponseEntity.ok(saved);
        } else {
            return ResponseEntity.badRequest().body("Session introuvable");
        }
    }
    
    // Garde ton ancien GetMapping user si tu l'as encore...
}