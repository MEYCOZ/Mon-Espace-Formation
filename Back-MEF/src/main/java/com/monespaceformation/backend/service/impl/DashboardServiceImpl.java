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

        // 2. Chercher la formation
        // AVANT : On prenait une formation au hasard.
        // MAINTENANT : On met null, car un nouvel inscrit n'a rien acheté.
        Training training = null;

        // 3. Calculer les Statistiques (Tout à 0)
        DashboardSummary.Statistics stats = new DashboardSummary.Statistics();

        // Si plus tard on a une formation, on remplira ça. Pour l'instant c'est 0.
        if (training != null) {
            stats.setFormationsSuivies(1);
            stats.setHeuresFormation(35); // Exemple
            stats.setAttestations(0);
        } else {
            stats.setFormationsSuivies(0);
            stats.setHeuresFormation(0);
            stats.setAttestations(0);
        }

        // 4. Remplir le DashboardSummary
        DashboardSummary summary = new DashboardSummary();
        summary.setUser(user);
        summary.setCurrentTraining(training); // Sera null
        summary.setStats(stats);

        return summary;
    }
}