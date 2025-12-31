package com.monespaceformation.backend.repository;

import com.monespaceformation.backend.model.SessionFormation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SessionRepository extends MongoRepository<SessionFormation, String> {
    // Rien de spécial à ajouter pour l'instant
}