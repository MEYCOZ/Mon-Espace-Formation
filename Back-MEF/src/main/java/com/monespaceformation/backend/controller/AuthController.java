package com.monespaceformation.backend.controller;

import com.monespaceformation.backend.model.User;
import com.monespaceformation.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- ROUTE INSCRIPTION ---
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // 1. On vérifie si l'email existe déjà
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Erreur : Cet email est déjà utilisé !"));
        }

        // 2. On crypte le mot de passe avant de le sauvegarder
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 3. On sauvegarde dans la base de données
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Inscription réussie !"));
    }

    // --- ROUTE CONNEXION ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // 1. On cherche l'utilisateur
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // 2. On compare le mot de passe envoyé avec celui crypté
            if (passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.ok(Map.of(
                        "message", "Connexion réussie",
                        "prenom", user.getPrenom(),
                        "nom", user.getNom(),
                        "email", user.getEmail()
                ));
            }
        }

        // Si ça rate
        return ResponseEntity.status(401).body(Map.of("message", "Email ou mot de passe incorrect"));
    }
}