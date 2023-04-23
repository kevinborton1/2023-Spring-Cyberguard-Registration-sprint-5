package com.cyberguard.app.registration.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Prereqs 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private String targetCourse;

    @Column
    private String requirementCourse;

    //Setters
    public void setTargetCourse(String targetCourse) {
        this.targetCourse = targetCourse;
    }

    public void setRequirementCourse(String requirementCourse) {
        this.requirementCourse = requirementCourse;
    }

    //Getters
    public String getTargetCourse() {
        return targetCourse;
    }

    public String getRequirementCourse() {
        return requirementCourse;
    }
    
}