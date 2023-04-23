package com.cyberguard.app.registration.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cyberguard.app.registration.models.Student;

public interface StudentRepo extends JpaRepository<Student, Long> {

    Student findByEmail(String email);

    Optional<Student> findByStudentId(int studentId);
    

}
