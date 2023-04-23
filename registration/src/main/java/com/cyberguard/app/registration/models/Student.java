package com.cyberguard.app.registration.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int studentId;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private Long majorId;

    @Column
    String majorName;

    @Column
    private String enrolledCourseIds;

    @Column
    private String takenCourseIds;

    @Column
    private String neededCourseIds;
    @Column
    private String enrolledSections;

    // setters
    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setMajorId(Long majorId) {
        this.majorId = majorId;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public void setEnrolledCourseIds(String enrolledCourseIds) {
        this.enrolledCourseIds = enrolledCourseIds;
    }

    public void setTakenCourseIds(String takenCourseIds) {
        this.takenCourseIds = takenCourseIds;
    }

    public void setNeededCourseIds(String neededCourseIds) {
        this.neededCourseIds = neededCourseIds;
    }

    public void setEnrolledSections(String enrolledSections) {
        this.enrolledSections = enrolledSections;
    }
    // getters

    public int getStudentId() {
        return studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Long getMajorId() {
        return majorId;
    }

    public String getMajorName() {
        return majorName;
    }

    public String getEnrolledCourseIds() {
        return enrolledCourseIds;
    }

    public String getTakenCourseIds() {
        return takenCourseIds;
    }

    public String getNeededCourseIds() {
        return neededCourseIds;
    }

    public String getEnrolledSections() {
        return enrolledSections;
    }

    public Student orElseThrow(Object object) {
        return null;
    }

}
