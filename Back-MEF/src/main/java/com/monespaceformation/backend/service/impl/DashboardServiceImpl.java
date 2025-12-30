package com.monespaceformation.backend.service.impl;

import com.monespaceformation.backend.dto.DashboardSummary;
import com.monespaceformation.backend.model.Training;
import com.monespaceformation.backend.model.User;
import com.monespaceformation.backend.repository.TrainingRepository;
import com.monespaceformation.backend.repository.UserRepository;
import com.monespaceformation.backend.service.DashboardService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    
    // Je garde cette ligne même si elle est jaune pour l'instant, 
    // car on s'en servira bientôt pour chercher les vraies formations.
    private final TrainingRepository trainingRepository;

    public DashboardServiceImpl(UserRepository userRepository, TrainingRepository trainingRepository) {
        this.userRepository = userRepository;
        this.trainingRepository = trainingRepository;
    }

    @Override
    public DashboardSummary getDashboardByEmail(String email) {
        // 1. Chercher l'utilisateur
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return null;
        }
        User user = userOpt.get();

        // 2. Simulation : Pas de formation pour le moment
        Training training = null;

        // 3. Calculer les Statistiques
        DashboardSummary.Statistics stats = new DashboardSummary.Statistics();

        // J'ai enlevé le "if (training != null)" car c'est du code mort pour l'instant.
        // On met directement les stats à 0 par défaut.
        stats.setFormationsSuivies(0);
        stats.setHeuresFormation(0);
        stats.setAttestations(0);

        // 4. Remplir le DashboardSummary
        DashboardSummary summary = new DashboardSummary();
        summary.setUser(user);
        summary.setCurrentTraining(training);
        summary.setStats(stats);

        return summary;
    }
}