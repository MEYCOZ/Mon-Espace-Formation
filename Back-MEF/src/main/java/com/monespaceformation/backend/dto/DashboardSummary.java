package com.monespaceformation.backend.dto;

import com.monespaceformation.backend.model.Training;
import com.monespaceformation.backend.model.User;

public class DashboardSummary {
    private User user;
    private Training currentTraining;
    private Statistics stats; // L'objet qui posait problème

    // --- GETTERS & SETTERS PRINCIPAUX ---
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Training getCurrentTraining() { return currentTraining; }
    public void setCurrentTraining(Training currentTraining) { this.currentTraining = currentTraining; }

    public Statistics getStats() { return stats; }
    public void setStats(Statistics stats) { this.stats = stats; }

    // --- CLASSE INTERNE "STATISTICS" ---
    public static class Statistics {
        private int formationsSuivies;
        private int heuresFormation;
        private int attestations;

        // 👇 C'EST CE CONSTRUCTEUR VIDE QUI MANQUAIT ! 👇
        public Statistics() {
        }

        // Constructeur avec arguments (celui que Java voyait)
        public Statistics(int formationsSuivies, int heuresFormation, int attestations) {
            this.formationsSuivies = formationsSuivies;
            this.heuresFormation = heuresFormation;
            this.attestations = attestations;
        }

        // Getters & Setters des stats
        public int getFormationsSuivies() { return formationsSuivies; }
        public void setFormationsSuivies(int formationsSuivies) { this.formationsSuivies = formationsSuivies; }

        public int getHeuresFormation() { return heuresFormation; }
        public void setHeuresFormation(int heuresFormation) { this.heuresFormation = heuresFormation; }

        public int getAttestations() { return attestations; }
        public void setAttestations(int attestations) { this.attestations = attestations; }
    }
}