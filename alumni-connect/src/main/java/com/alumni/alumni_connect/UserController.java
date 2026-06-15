package com.alumni.alumni_connect;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/users")

@CrossOrigin(origins = "http://localhost:4200")

public class UserController {

    private final UserRepository repository;

    public UserController(
            UserRepository repository
    ) {
        this.repository = repository;
    }

    // =========================================
    // GET ALL APPROVED ALUMNI
    // =========================================

    @GetMapping("/alumni")
    public List<User> getAllAlumni() {

        return repository.findByRoleAndStatus(
                "ALUMNI",
                "APPROVED"
        );
    }

    // =========================================
    // GET ALL APPROVED STUDENTS
    // =========================================

    @GetMapping("/students")
    public List<User> getAllStudents() {

        return repository.findByRoleAndStatus(
                "STUDENT",
                "APPROVED"
        );
    }

    // =========================================
    // GET USER BY ID
    // =========================================

    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id
    ) {

        return repository.findById(id)

                .orElseThrow(

                        () -> new RuntimeException(
                                "User not found"
                        )
                );
    }

    // =========================================
    // GET USER BY EMAIL
    // =========================================

    @GetMapping("/email/{email}")
    public User getUserByEmail(
            @PathVariable String email
    ) {

        return repository.findByEmail(email)

                .orElseThrow(

                        () -> new RuntimeException(
                                "User not found"
                        )
                );
    }
    // =========================================
// GET ALL USERS
// =========================================

    @GetMapping

    public List<User> getAllUsers() {

        return repository.findAll();
    }

    // =========================================
    // UPDATE PROFILE
    // =========================================

    @PutMapping("/{id}")

    public User updateProfile(

            @PathVariable Long id,

            @RequestBody User updatedUser

    ) {

        User user = repository

                .findById(id)

                .orElseThrow();

        // BASIC INFO

        user.setName(
                updatedUser.getName()
        );

        user.setCollege(
                updatedUser.getCollege()
        );

        user.setBranch(
                updatedUser.getBranch()
        );

        user.setPassoutYear(
                updatedUser.getPassoutYear()
        );

        user.setRollno(
                updatedUser.getRollno()
        );

        user.setSection(
                updatedUser.getSection()
        );

        // PROFILE INFO

        user.setBio(
                updatedUser.getBio()
        );

        user.setSkills(
                updatedUser.getSkills()
        );

        user.setCompany(
                updatedUser.getCompany()
        );

        user.setJobRole(
                updatedUser.getJobRole()
        );

        user.setLinkedin(
                updatedUser.getLinkedin()
        );

        user.setGithub(
                updatedUser.getGithub()
        );

        user.setProfileImage(
                updatedUser.getProfileImage()
        );

        user.setInterests(
                updatedUser.getInterests()
        );

        user.setLocation(
                updatedUser.getLocation()
        );

        // SAVE

        return repository.save(user);
    }
}