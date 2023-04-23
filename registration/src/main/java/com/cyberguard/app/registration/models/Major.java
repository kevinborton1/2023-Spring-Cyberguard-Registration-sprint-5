package com.cyberguard.app.registration.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;

import java.util.List;

@Entity
public class Major {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int majorId;

    @Column
    private String majorName;

    // This is used to get all the courses required for this major
    @ManyToMany
    @JoinTable(name = "Major_Course", joinColumns = { @JoinColumn(name = "majorId") }, inverseJoinColumns = {
            @JoinColumn(name = "courseId") })
    private List<Course> requirements;

    // Setters
    public void setMajorId(int majorId) {
        this.majorId = majorId;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    // Getters
    public int getMajorId() {
        return majorId;
    }

    public String getMajorName() {
        return majorName;
    }

    public List<Course> getRequirements() {
        return requirements;
    }
}
