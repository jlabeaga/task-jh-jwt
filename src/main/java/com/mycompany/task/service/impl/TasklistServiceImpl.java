package com.mycompany.task.service.impl;

import com.mycompany.task.service.TasklistService;
import com.mycompany.task.domain.Tasklist;
import com.mycompany.task.repository.TasklistRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Tasklist}.
 */
@Service
@Transactional
public class TasklistServiceImpl implements TasklistService {

    private final Logger log = LoggerFactory.getLogger(TasklistServiceImpl.class);

    private final TasklistRepository tasklistRepository;

    public TasklistServiceImpl(TasklistRepository tasklistRepository) {
        this.tasklistRepository = tasklistRepository;
    }

    /**
     * Save a tasklist.
     *
     * @param tasklist the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Tasklist save(Tasklist tasklist) {
        log.debug("Request to save Tasklist : {}", tasklist);
        return tasklistRepository.save(tasklist);
    }

    /**
     * Get all the tasklists.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Tasklist> findAll() {
        log.debug("Request to get all Tasklists");
        return tasklistRepository.findAllWithEagerRelationships();
    }


    /**
     * Get all the tasklists with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Tasklist> findAllWithEagerRelationships(Pageable pageable) {
        return tasklistRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one tasklist by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Tasklist> findOne(Long id) {
        log.debug("Request to get Tasklist : {}", id);
        return tasklistRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the tasklist by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tasklist : {}", id);
        tasklistRepository.deleteById(id);
    }
}
