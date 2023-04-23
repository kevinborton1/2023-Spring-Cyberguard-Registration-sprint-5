package com.cyberguard.app.registration.services;

import org.springframework.stereotype.Service;

import com.cyberguard.app.registration.models.Student;

@Service
public class StudentService {

    public Student findStudentByIdOrEmail(String search) {
        return null;
    }

    public com.cyberguard.app.registration.models.Student findById(Long studentId) {
        return null;
    }

    public void addCourse(Long studentId, Long courseId) {
    }

    public void removeCourse(Long studentId, Long courseId) {
    }

}
