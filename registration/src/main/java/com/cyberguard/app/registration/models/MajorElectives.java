package com.cyberguard.app.registration.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "majorelectives")
public class MajorElectives {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int counter;

    @Column
    private int majorId;

    @Column
    private String majorName;

    @Column
    private int electiveId;

    @Column
    private String electiveGroup;

    @Column
    private int requiredNumber;
    @Column
    private String acceptableCourses;

    // Setters
    public void setMajorId(int majorId) {
        this.majorId = majorId;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public void setElectiveId(int electiveId) {
        this.electiveId = electiveId;
    }

    public void setElectiveGroup(String electiveGroup) {
        this.electiveGroup = electiveGroup;
    }

    public void setRequiredNumber(int requiredNumber) {
        this.requiredNumber = requiredNumber;
    }

    public void setAcceptableCourses(String acceptableCourses) {
        this.acceptableCourses = acceptableCourses;
    }

    // Getters
    public int getCounter() {
        return counter;
    }

    public int getMajorId() {
        return majorId;
    }

    public String getMajorName() {
        return majorName;
    }

    public int getElectiveId() {
        return electiveId;
    }

    public String getElectiveGroup() {
        return electiveGroup;
    }

    public int getRequiredNumber() {
        return requiredNumber;
    }

    public String getAcceptableCourses() {
        return acceptableCourses;
    }
}
