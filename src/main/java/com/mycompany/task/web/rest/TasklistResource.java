package com.mycompany.task.web.rest;

import com.mycompany.task.domain.Tasklist;
import com.mycompany.task.service.TasklistService;
import com.mycompany.task.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.task.domain.Tasklist}.
 */
@RestController
@RequestMapping("/api")
public class TasklistResource {

    private final Logger log = LoggerFactory.getLogger(TasklistResource.class);

    private static final String ENTITY_NAME = "tasklist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TasklistService tasklistService;

    public TasklistResource(TasklistService tasklistService) {
        this.tasklistService = tasklistService;
    }

    /**
     * {@code POST  /tasklists} : Create a new tasklist.
     *
     * @param tasklist the tasklist to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tasklist, or with status {@code 400 (Bad Request)} if the tasklist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tasklists")
    public ResponseEntity<Tasklist> createTasklist(@Valid @RequestBody Tasklist tasklist) throws URISyntaxException {
        log.debug("REST request to save Tasklist : {}", tasklist);
        if (tasklist.getId() != null) {
            throw new BadRequestAlertException("A new tasklist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tasklist result = tasklistService.save(tasklist);
        return ResponseEntity.created(new URI("/api/tasklists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tasklists} : Updates an existing tasklist.
     *
     * @param tasklist the tasklist to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tasklist,
     * or with status {@code 400 (Bad Request)} if the tasklist is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tasklist couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tasklists")
    public ResponseEntity<Tasklist> updateTasklist(@Valid @RequestBody Tasklist tasklist) throws URISyntaxException {
        log.debug("REST request to update Tasklist : {}", tasklist);
        if (tasklist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tasklist result = tasklistService.save(tasklist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tasklist.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tasklists} : get all the tasklists.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tasklists in body.
     */
    @GetMapping("/tasklists")
    public List<Tasklist> getAllTasklists(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Tasklists");
        return tasklistService.findAll();
    }

    /**
     * {@code GET  /tasklists/:id} : get the "id" tasklist.
     *
     * @param id the id of the tasklist to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tasklist, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tasklists/{id}")
    public ResponseEntity<Tasklist> getTasklist(@PathVariable Long id) {
        log.debug("REST request to get Tasklist : {}", id);
        Optional<Tasklist> tasklist = tasklistService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tasklist);
    }

    /**
     * {@code DELETE  /tasklists/:id} : delete the "id" tasklist.
     *
     * @param id the id of the tasklist to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tasklists/{id}")
    public ResponseEntity<Void> deleteTasklist(@PathVariable Long id) {
        log.debug("REST request to delete Tasklist : {}", id);
        tasklistService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
