package com.mycompany.task.service;

import com.mycompany.task.domain.Tasklist;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Tasklist}.
 */
public interface TasklistService {

    /**
     * Save a tasklist.
     *
     * @param tasklist the entity to save.
     * @return the persisted entity.
     */
    Tasklist save(Tasklist tasklist);

    /**
     * Get all the tasklists.
     *
     * @return the list of entities.
     */
    List<Tasklist> findAll();

    /**
     * Get all the tasklists with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Tasklist> findAllWithEagerRelationships(Pageable pageable);


    /**
     * Get the "id" tasklist.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Tasklist> findOne(Long id);

    /**
     * Delete the "id" tasklist.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
