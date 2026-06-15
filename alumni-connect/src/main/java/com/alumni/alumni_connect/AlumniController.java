package com.alumni.alumni_connect;

import org.springframework.web.bind.annotation.*;

import java.util.List;

// ✅ IMPORTANT IMPORTS
import com.alumni.alumni_connect.User;
import com.alumni.alumni_connect.UserRepository;

@RestController

@RequestMapping("/alumni")

@CrossOrigin(origins = "http://localhost:4200")

public class AlumniController {

    private final UserRepository repository;

    public AlumniController(
            UserRepository repository
    ) {
        this.repository = repository;
    }

    // =====================================================
    // GET ALL APPROVED ALUMNI
    // =====================================================

    @GetMapping
    public List<User> getAllApprovedAlumni() {

        return repository.findByRoleAndStatus(
                "ALUMNI",
                "APPROVED"
        );
    }

    // =====================================================
    // ADD ALUMNI
    // =====================================================

    @PostMapping
    public User addAlumni(
            @RequestBody User alumni
    ) {

        alumni.setRole("ALUMNI");

        alumni.setStatus("PENDING");

        return repository.save(alumni);
    }

    // =====================================================
    // GET APPROVED ALUMNI
    // =====================================================

    @GetMapping("/approved")
    public List<User> getApprovedAlumni() {

        return repository.findByRoleAndStatus(
                "ALUMNI",
                "APPROVED"
        );
    }

    // =====================================================
    // DELETE ALUMNI
    // =====================================================

    @DeleteMapping("/{id}")
    public void deleteAlumni(
            @PathVariable Long id
    ) {

        repository.deleteById(id);
    }

    // =====================================================
    // APPROVE ALUMNI
    // =====================================================

    @PutMapping("/approve/{id}")
    public User approveAlumni(
            @PathVariable Long id
    ) {

        User alumni =
                repository.findById(id)
                        .orElseThrow();

        alumni.setStatus("APPROVED");

        return repository.save(alumni);
    }
}