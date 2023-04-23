package com.cyberguard.app.registration.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cyberguard.app.registration.models.Sections;

public interface SectionsRepo extends JpaRepository<Sections, Long> {

    List<Sections> findBySemester(String semester);

    Optional<Sections> findById(int sectionID);

    List<Sections> findByCourseIdStartingWith(String courseIdPrefix);

}
