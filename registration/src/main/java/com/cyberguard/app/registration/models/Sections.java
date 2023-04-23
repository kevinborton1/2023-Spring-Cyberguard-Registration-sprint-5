package com.cyberguard.app.registration.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Sections {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private int id;

  @Column
  private String courseId;

  @Column
  private String courseDays;

  @Column
  private String semester;

  @Column
  private String courseDates;

  @Column
  private String courseTimes;

  @Column
  private String courseCampus;

  @Column
  private String courseBuilding;

  @Column
  private String courseRoom;

  @Column
  private String courseType;

  @Column
  private int courseMaxEnrollment;

  @Column
  private int courseCurrentEnrolled;

  // Setters
  public void setId(int id) {
    this.id = id;
  }

  public void setCourseId(String courseId) {
    this.courseId = courseId;
  }

  public void setCourseDays(String courseDays) {
    this.courseDays = courseDays;
  }

  public void setSemester(String semester) {
    this.semester = semester;
  }

  public void setCourseDates(String courseDates) {
    this.courseDates = courseDates;
  }

  public void setCourseTimes(String courseTimes) {
    this.courseTimes = courseTimes;
  }

  public void setCourseCampus(String courseCampus) {
    this.courseCampus = courseCampus;
  }

  public void setCourseBuilding(String courseBuilding) {
    this.courseBuilding = courseBuilding;
  }

  public void setCourseRoom(String courseRoom) {
    this.courseRoom = courseRoom;
  }

  public void setCourseType(String courseType) {
    this.courseType = courseType;
  }

  public void setCourseMaxEnrollment(int courseMaxEnrollment) {
    this.courseMaxEnrollment = courseMaxEnrollment;
  }

  public void setCourseCurrentEnrolled(int courseCurrentEnrolled) {
    this.courseCurrentEnrolled = courseCurrentEnrolled;
  }

  // Getters
  public int getId() {
    return id;
  }

  public String getCourseId() {
    return courseId;
  }

  public String getCourseDays() {
    return courseDays;
  }

  public String getSemester() {
    return semester;
  }

  public String getCourseDates() {
    return courseDates;
  }

  public String getCourseTimes() {
    return courseTimes;
  }

  public String getCourseCampus() {
    return courseCampus;
  }

  public String getCourseBuilding() {
    return courseBuilding;
  }

  public String getCourseRoom() {
    return courseRoom;
  }

  public String getCourseType() {
    return courseType;
  }

  public int getCourseMaxEnrollment() {
    return courseMaxEnrollment;
  }

  public int getCourseCurrentEnrolled() {
    return courseCurrentEnrolled;
  }
}
