package com.cyberguard.app.registration.repo;

import com.cyberguard.app.registration.models.MajorElectives;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MajorElectivesRepo extends JpaRepository<MajorElectives, Long> {
    List<MajorElectives> findAll();

    List<MajorElectives> findByMajorId(Integer majorId);
}