package com.cyberguard.app.registration.services;

import com.cyberguard.app.registration.models.Course;
import com.cyberguard.app.registration.repo.CourseRepo; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepo courseRepository; // Change the type to CourseRepo

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) { // Update the parameter type to Long
        return courseRepository.findById(id).orElse(null);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) { // Update the parameter type to Long
        courseRepository.deleteById(id);
    }
}
