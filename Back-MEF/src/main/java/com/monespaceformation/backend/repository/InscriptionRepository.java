package com.monespaceformation.backend.repository;

import com.monespaceformation.backend.model.Inscription;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

// On utilise MongoRepository au lieu de JpaRepository
public interface InscriptionRepository extends MongoRepository<Inscription, String> {
    List<Inscription> findByUserId(Long userId);
}