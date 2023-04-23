package com.cyberguard.app.registration.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

import com.cyberguard.app.registration.models.Course;
import com.cyberguard.app.registration.models.Student;
import com.cyberguard.app.registration.services.CourseService;
import com.cyberguard.app.registration.services.StudentService;



@Controller
public class AdminController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private CourseService courseService;

    @GetMapping("/admin")
    public String adminHome() {
        return "adminHome";
    }

    

@PostMapping("/admin/search")
public String searchStudent(@RequestParam("search") String search, Model model) {
    Student student = studentService.findStudentByIdOrEmail(search);
    if (student != null) {
        model.addAttribute("student", student);
        return "studentDetails";
    } else {
        model.addAttribute("errorMessage", "No student found with the given ID or email.");
        return "adminHome";
    }
}

@GetMapping("/admin/manage-courses/{studentId}")
public String manageCourses(@PathVariable("studentId") Long studentId, Model model) {
    Student student = studentService.findById(studentId);
    List<Course> allCourses = courseService.getAllCourses();
    model.addAttribute("student", student);
    model.addAttribute("courses", allCourses);
    return "manageCourses";
}

@PostMapping("/admin/add-course/{studentId}/{courseId}")
public String addCourseToStudent(@PathVariable("studentId") Long studentId, @PathVariable("courseId") Long courseId) {
    studentService.addCourse(studentId, courseId);
    return "redirect:/admin/manage-courses/" + studentId;
}

@PostMapping("/admin/remove-course/{studentId}/{courseId}")
public String removeCourseFromStudent(@PathVariable("studentId") Long studentId, @PathVariable("courseId") Long courseId) {
    studentService.removeCourse(studentId, courseId);
    return null;
}

}
