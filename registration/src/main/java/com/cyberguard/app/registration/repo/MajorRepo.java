package com.cyberguard.app.registration.repo;

import com.cyberguard.app.registration.models.MajorLite;
import com.cyberguard.app.registration.models.Major;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MajorRepo extends JpaRepository<Major, Long> {

    // Query to get list of Majors (majorName and majorId) as MajorLite objects
    @Query(value = "SELECT M.Major_Name as majorName, M.Major_ID as majorId FROM major M", nativeQuery = true)
    List<MajorLite> findMajorNames();

}