package com.mycompany.task.repository;

import com.mycompany.task.domain.Task;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Task entity.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("select task from Task task where task.owner.login = ?#{principal.username}")
    List<Task> findByOwnerIsCurrentUser();

    @Query(value = "select distinct task from Task task left join fetch task.resources",
        countQuery = "select count(distinct task) from Task task")
    Page<Task> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct task from Task task left join fetch task.resources")
    List<Task> findAllWithEagerRelationships();

    @Query("select task from Task task left join fetch task.resources where task.id =:id")
    Optional<Task> findOneWithEagerRelationships(@Param("id") Long id);
}
