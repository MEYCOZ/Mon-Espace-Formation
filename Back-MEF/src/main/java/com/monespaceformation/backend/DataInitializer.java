package com.monespaceformation.backend;

import com.monespaceformation.backend.model.SessionFormation;
import com.monespaceformation.backend.repository.SessionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(SessionRepository sessionRepository) {
        return args -> {
            // On nettoie la base pour repartir proprement à chaque redémarrage (optionnel, pratique pour tester)
            // sessionRepository.deleteAll(); 

            if (sessionRepository.count() == 0) {
                System.out.println("⚡ Création de la session unique...");
                
                // Une seule session, ID "1" pour simplifier la vie
                SessionFormation session = new SessionFormation("Du 15 Janvier au 19 Janvier 2025", "Paris - 75008", 12);
                session.setId("1"); // On force l'ID à 1 pour que ce soit facile à trouver
                
                sessionRepository.save(session);
                
                System.out.println("✅ Session unique créée !");
            }
        };
    }
}