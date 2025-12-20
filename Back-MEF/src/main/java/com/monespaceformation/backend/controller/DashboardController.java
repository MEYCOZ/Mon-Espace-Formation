package com.monespaceformation.backend.controller;

import com.monespaceformation.backend.dto.DashboardSummary;
import com.monespaceformation.backend.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/{email:.+}")
    public ResponseEntity<DashboardSummary> getDashboard(@PathVariable String email) {
        System.out.println("🔍 REQUÊTE REÇUE pour : " + email);

        DashboardSummary dashboard = dashboardService.getDashboardByEmail(email);

        if (dashboard == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dashboard);
    }
}