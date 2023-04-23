package com.cyberguard.app.registration.repo;

import com.cyberguard.app.registration.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Course, Long> {}
