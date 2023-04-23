package com.cyberguard.app.registration.controller;

// Imports 
import org.springframework.security.crypto.bcrypt.BCrypt;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.cyberguard.app.registration.models.Course;
import com.cyberguard.app.registration.models.Student;
import com.cyberguard.app.registration.models.MajorLite;
import com.cyberguard.app.registration.models.Sections;
import com.cyberguard.app.registration.models.Major;
import com.cyberguard.app.registration.models.MajorElectives;
import com.cyberguard.app.registration.repo.CourseRepo;
import com.cyberguard.app.registration.repo.MajorElectivesRepo;
import com.cyberguard.app.registration.repo.MajorRepo;
import com.cyberguard.app.registration.repo.SectionsRepo;
import com.cyberguard.app.registration.repo.StudentRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

@RestController
public class ApiControllers {

    // Injecting major repositories and course repositories
    @Autowired
    private MajorRepo majorRepo;
    @Autowired
    private CourseRepo courseRepo;
    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    SectionsRepo sectionsRepo;
    @Autowired
    MajorElectivesRepo majorElectivesRepo;

    // Get mapping to list all majors
    @GetMapping(value = "/majors")
    public List<Major> getMajors() {
        return majorRepo.findAll();
    }

    // Get mapping to list all major names
    @GetMapping(value = "/major_names")
    public List<MajorLite> getMajorNames() {
        return majorRepo.findMajorNames();
    }

    // Get mapping to list all courses
    @GetMapping(value = "/courses")
    public List<Course> getCourses() {
        return courseRepo.findAll();
    }

    // Get mapping to list all offerered courses
    @GetMapping(value = "/sections")
    public List<Sections> getSections() {
        return sectionsRepo.findAll();
    }

    // Get mapping to list all offered courses for only a specified semester
    @GetMapping("/sections/{semester}")
    public List<Sections> getSectionsBySemester(@PathVariable String semester) {
        return sectionsRepo.findBySemester(semester);
    }

    /* Put mapping to take a course id from enrolled course ids, give a grade as
    entered by admin, and add that to takenCourseIds.*/ 
    @PutMapping("/admin/{studentId}/grade")
    public ResponseEntity<?> gradeCourse(
            @PathVariable int studentId,
            @RequestParam String courseId,
            @RequestParam String letterGrade) {
        Optional<Student> studentOptional = studentRepo.findByStudentId(studentId);

        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            String enrolledCourseIds = student.getEnrolledCourseIds();
            String takenCourseIds = student.getTakenCourseIds();

            if (enrolledCourseIds == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enrolled courses are empty.");
            }

            List<String> enrolledCourses = Arrays.asList(enrolledCourseIds.split(","));
            List<String> takenCourses = takenCourseIds == null ? new ArrayList<>()
                    : Arrays.asList(takenCourseIds.split(","));

            if (enrolledCourses.contains(courseId)) {
                enrolledCourses = enrolledCourses.stream()
                        .filter(c -> !c.equals(courseId))
                        .collect(Collectors.toList());

                takenCourses.add(courseId + "-" + letterGrade);
                student.setEnrolledCourseIds(String.join(",", enrolledCourses));
                student.setTakenCourseIds(String.join(",", takenCourses));

                studentRepo.save(student);
                return ResponseEntity.ok("Course graded and moved to taken courses.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Course not found in enrolled courses.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
        }
    }

    // Get mapping to list all avaliable classes required for the student to
    // graduate.
    @GetMapping("/enrollment/{semester}/{email}")
    public List<Sections> getSectionsBySemester(@PathVariable String semester, @PathVariable String email) {
        Student student = studentRepo.findByEmail(email);

        List<String> neededCourseIds = new ArrayList<>();
        Optional<Major> majorOp = majorRepo.findById(student.getMajorId());
        if (majorOp.isPresent()) {
            for (Course req : majorOp.get().getRequirements()) {
                neededCourseIds.add(req.getCourseName());
            }
        }
        List<Sections> sections = sectionsRepo.findBySemester(semester);
        List<Sections> filteredSections = new ArrayList<>();

        if (majorOp.isPresent()) {
            Major major = majorOp.get();
            Integer majorId = Integer.valueOf(major.getMajorId());
            List<MajorElectives> majorElectivesByMajorId = majorElectivesRepo.findByMajorId(majorId);
            List<String> acceptableCourses = new ArrayList<>();
            for (MajorElectives majorElective : majorElectivesByMajorId) {
                String courses = majorElective.getAcceptableCourses();
                if (courses != null) {
                    acceptableCourses.addAll(Arrays.asList(courses.split(", ")));
                }
            }
            for (Sections section : sections) {
                String courseId = section.getCourseId();
                for (String neededCourseId : neededCourseIds) {
                    if (courseId.startsWith(neededCourseId.trim().substring(0, 7))) {
                        filteredSections.add(section);
                        break;
                    }
                }
                for (String acceptableCourse : acceptableCourses) {
                    if (courseId.startsWith(acceptableCourse.trim().substring(0, 7))) {
                        filteredSections.add(section);
                        break;
                    }
                }
            }
        }
        return filteredSections;
    }

    /*
     * 
     * List<Sections> sections = new ArrayList<>();
     * for (String courseId : acceptableCourses) {
     * List<Sections> sectionsByCourseId =
     * sectionsRepo.findByCourseIdStartingWith(courseId);
     * sections.addAll(sectionsByCourseId);
     * }
     * return sections;
     * }
     */

    // Get mapping to list all login information used to store local storage so a
    // user will stay logged in in between web pages.
    @GetMapping(value = "/student")
    public List<Student> getStudents() {
        return studentRepo.findAll();
    }

    // Get mapping to list information for a given student
    @GetMapping("/load/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Student student = studentRepo.findByEmail(email);

        if (student == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(student, HttpStatus.OK);
        }
    }

    // saves a new user to the database, encrypts password
    @CrossOrigin(origins = "*")
    @PostMapping(value = "/new_user")
    public String saveUser(@RequestBody Student student) {
        String hashedPassword = BCrypt.hashpw(student.getPassword(), BCrypt.gensalt(10));
        student.setPassword(hashedPassword);
        Optional<Major> majorOp = majorRepo.findById(student.getMajorId());
        if (majorOp.isPresent()) {
            List<String> neededCourseIds = new ArrayList<>();
            for (Course req : majorOp.get().getRequirements()) {
                neededCourseIds.add(req.getCourseName());
            }
            String neededCourseIdsString = String.join(",", neededCourseIds);
            student.setNeededCourseIds(neededCourseIdsString);
            studentRepo.save(student);
        }
        return "Saved...";
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/loaduser/{email}")
    public ResponseEntity<String> getUserByEmail(@PathVariable String email) {
        Student student = studentRepo.findByEmail(email);

        if (student == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Map<String, Object> responseMap = new HashMap<>();
            List<Map<String, Object>> sectionsList = new ArrayList<>();
            String enrolledSectionsStr = student.getEnrolledSections();
            for (String sectionId : enrolledSectionsStr.split(",")) {
                int splitSectionId = Integer.parseInt(sectionId);
                Optional<Sections> sections = sectionsRepo.findById(splitSectionId);
                Sections section = sections.get();

                Map<String, Object> sectionMap = new HashMap<>();
                sectionMap.put("sectionId", section.getId());
                sectionMap.put("semester", section.getSemester());
                sectionMap.put("courseId", section.getCourseId());
                sectionMap.put("courseCampus", section.getCourseCampus());
                sectionMap.put("courseBuilding", section.getCourseBuilding());
                sectionMap.put("courseRoom", section.getCourseRoom());
                sectionMap.put("courseDates", section.getCourseDates());
                sectionMap.put("courseDays", section.getCourseDays());
                sectionMap.put("courseTimes", section.getCourseTimes());
                sectionMap.put("courseType", section.getCourseType());
                sectionsList.add(sectionMap);
            }

            responseMap.put("enrolledSections", sectionsList);

            ObjectMapper mapper = new ObjectMapper();
            String jsonResponse;
            try {
                jsonResponse = mapper.writeValueAsString(responseMap);
            } catch (JsonProcessingException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
        }
    }

    @Transactional
    @GetMapping("/drop/{studentEmail}/{sectionId}")
    public String handleDropRequest(@PathVariable String studentEmail, @PathVariable String sectionId) {
        Student student = studentRepo.findByEmail(studentEmail);
        int droppedSectionId = Integer.parseInt(sectionId);

        String[] enrolledSections = student.getEnrolledSections().split(",");
        List<Integer> enrolledSectionsList = new ArrayList<>();
        for (String section : enrolledSections) {
            enrolledSectionsList.add(Integer.parseInt(section.trim()));
        }

        enrolledSectionsList.removeIf(section -> section == droppedSectionId);

        String updatedEnrolledSections = String.join(",",
                enrolledSectionsList.stream().map(Object::toString).toArray(String[]::new));

        Optional<Sections> sections = sectionsRepo.findById(droppedSectionId);
        Sections section = sections.get();
        int currentEnrollment = section.getCourseCurrentEnrolled();
        student.setEnrolledSections(updatedEnrolledSections);

        List<String> enrolledCoursesList = new ArrayList<>(Arrays.asList(student.getEnrolledCourseIds().split(",")));
        List<String> neededCourseIds = new ArrayList<>(Arrays.asList(student.getNeededCourseIds().split(",")));

        enrolledCoursesList.removeIf(courseId -> courseId.startsWith(section.getCourseId().substring(0, 7)));
        neededCourseIds.add(section.getCourseId().substring(0, 7));

        section.setCourseCurrentEnrolled(currentEnrollment - 1);

        sectionsRepo.save(section);

        student.setEnrolledCourseIds(String.join(",", enrolledCoursesList));
        student.setNeededCourseIds(String.join(",", neededCourseIds));
        studentRepo.save(student);

        return "Saved...";
    }

    // enrolls a student in a course, checks if course is already enrolled in, if
    // not: course id is appended to the table
    // in addition, adds student to the current enrollment of the class if class is
    // not full.
    @PostMapping("/enroll/{studentId}")
    public ResponseEntity<String> enrollStudentInCourse(@PathVariable("studentId") int studentId,
            @RequestBody EnrollRequest request) {
        Student student = studentRepo.findById((long) studentId).orElse(null);
        if (student == null) {
            return new ResponseEntity<>("No student found with ID " + studentId, HttpStatus.NOT_FOUND);
        }
        int sectionID = Integer.parseInt(request.id);
        Optional<Sections> sections = sectionsRepo.findById(sectionID);
        Sections section = sections.get();
        int currentEnrollment = section.getCourseCurrentEnrolled();
        int courseMaxEnrollment = section.getCourseMaxEnrollment();
        String enrolledCourseIds = student.getEnrolledCourseIds();
        String[] neededCourseIds = student.getNeededCourseIds().split(",");
        String enrolledSections = student.getEnrolledSections();
        if (enrolledSections == null) {
            enrolledSections = "";
        }
        if (enrolledCourseIds == null) {
            enrolledCourseIds = request.courseId;
            if (sections.isPresent()) {
                if (currentEnrollment < courseMaxEnrollment) {
                    section.setCourseCurrentEnrolled(currentEnrollment + 1);
                    student.setEnrolledSections(String.valueOf(sectionID));
                    sectionsRepo.save(section);
                }

            }
        } else {
            String[] enrolledCourses = enrolledCourseIds.split(",");
            boolean alreadyEnrolled = false;
            for (String course : enrolledCourses) {
                if (course.trim().equals(request.courseId)) {
                    alreadyEnrolled = true;
                    break;
                }
            }
            if (!alreadyEnrolled) {
                enrolledCourseIds += ("," + request.courseId);
                if (sections.isPresent()) {
                    if (currentEnrollment < courseMaxEnrollment) {
                        section.setCourseCurrentEnrolled(currentEnrollment + 1);
                        sectionsRepo.save(section);
                    }

                }
                enrolledSections += ("," + request.id);
                student.setEnrolledSections(enrolledSections);
            }
        }

        student.setEnrolledCourseIds(enrolledCourseIds);
        studentRepo.save(student);
        List<String> neededCoursesList = new ArrayList<>(Arrays.asList(neededCourseIds));
        neededCoursesList.remove(request.courseId);
        String updatedNeededCourseIds = String.join(",", neededCoursesList);
        student.setNeededCourseIds(updatedNeededCourseIds);
        studentRepo.save(student);
        return new ResponseEntity<>("Successfully enrolled student " + studentId + " in course " + request.courseId,
                HttpStatus.OK);
    }

    private static class EnrollRequest {
        public String courseId;
        public String id;
    }

    // Get mapping to find a single major by Id
    @GetMapping(value = "/major")
    public Major getMajorById(Long Id) {
        // Getting optional major by Id in repository
        Optional<Major> majorOp = majorRepo.findById(Id);
        // If present, return the major
        if (majorOp.isPresent()) {
            return majorOp.get();
        }
        return null;
    }

    // Post Mapping when user logs in to verify password matches encryption
    @CrossOrigin(origins = "*")
    @PostMapping(value = "/studentVerify")
    public HttpStatusCode studentVerify(@RequestBody Student login) {
        String email = login.getEmail();
        String password = login.getPassword();

        String decodedEmail;
        try {
            decodedEmail = URLDecoder.decode(email, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build().getStatusCode();
        }
        boolean found = false;
        Student foundStudent = new Student();
        List<Student> students = studentRepo.findAll();
        for (Student student : students) {
            if (student.getEmail().equals(decodedEmail)) {
                found = true;
                foundStudent = student;
                break;
            }

        }
        if (!found)
            return ResponseEntity.notFound().build().getStatusCode();
        if (BCrypt.checkpw(password, foundStudent.getPassword())) {

            return ResponseEntity.ok().build().getStatusCode();
        } else {
            return ResponseEntity.notFound().build().getStatusCode();
        }

    }
}
