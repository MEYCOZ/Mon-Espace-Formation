package com.monespaceformation.backend.service;

import com.monespaceformation.backend.dto.DashboardSummary;

public interface DashboardService {
    DashboardSummary getDashboardByEmail(String email);
}