package com.mycompany.task.web.rest;

import com.mycompany.task.TaskApp;
import com.mycompany.task.domain.Tasklist;
import com.mycompany.task.repository.TasklistRepository;
import com.mycompany.task.service.TasklistService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TasklistResource} REST controller.
 */
@SpringBootTest(classes = TaskApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class TasklistResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TasklistRepository tasklistRepository;

    @Mock
    private TasklistRepository tasklistRepositoryMock;

    @Mock
    private TasklistService tasklistServiceMock;

    @Autowired
    private TasklistService tasklistService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTasklistMockMvc;

    private Tasklist tasklist;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tasklist createEntity(EntityManager em) {
        Tasklist tasklist = new Tasklist()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return tasklist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tasklist createUpdatedEntity(EntityManager em) {
        Tasklist tasklist = new Tasklist()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return tasklist;
    }

    @BeforeEach
    public void initTest() {
        tasklist = createEntity(em);
    }

    @Test
    @Transactional
    public void createTasklist() throws Exception {
        int databaseSizeBeforeCreate = tasklistRepository.findAll().size();
        // Create the Tasklist
        restTasklistMockMvc.perform(post("/api/tasklists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tasklist)))
            .andExpect(status().isCreated());

        // Validate the Tasklist in the database
        List<Tasklist> tasklistList = tasklistRepository.findAll();
        assertThat(tasklistList).hasSize(databaseSizeBeforeCreate + 1);
        Tasklist testTasklist = tasklistList.get(tasklistList.size() - 1);
        assertThat(testTasklist.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTasklist.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTasklistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tasklistRepository.findAll().size();

        // Create the Tasklist with an existing ID
        tasklist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTasklistMockMvc.perform(post("/api/tasklists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tasklist)))
            .andExpect(status().isBadRequest());

        // Validate the Tasklist in the database
        List<Tasklist> tasklistList = tasklistRepository.findAll();
        assertThat(tasklistList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tasklistRepository.findAll().size();
        // set the field null
        tasklist.setName(null);

        // Create the Tasklist, which fails.


        restTasklistMockMvc.perform(post("/api/tasklists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tasklist)))
            .andExpect(status().isBadRequest());

        List<Tasklist> tasklistList = tasklistRepository.findAll();
        assertThat(tasklistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTasklists() throws Exception {
        // Initialize the database
        tasklistRepository.saveAndFlush(tasklist);

        // Get all the tasklistList
        restTasklistMockMvc.perform(get("/api/tasklists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tasklist.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTasklistsWithEagerRelationshipsIsEnabled() throws Exception {
        when(tasklistServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTasklistMockMvc.perform(get("/api/tasklists?eagerload=true"))
            .andExpect(status().isOk());

        verify(tasklistServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTasklistsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(tasklistServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTasklistMockMvc.perform(get("/api/tasklists?eagerload=true"))
            .andExpect(status().isOk());

        verify(tasklistServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTasklist() throws Exception {
        // Initialize the database
        tasklistRepository.saveAndFlush(tasklist);

        // Get the tasklist
        restTasklistMockMvc.perform(get("/api/tasklists/{id}", tasklist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tasklist.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingTasklist() throws Exception {
        // Get the tasklist
        restTasklistMockMvc.perform(get("/api/tasklists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTasklist() throws Exception {
        // Initialize the database
        tasklistService.save(tasklist);

        int databaseSizeBeforeUpdate = tasklistRepository.findAll().size();

        // Update the tasklist
        Tasklist updatedTasklist = tasklistRepository.findById(tasklist.getId()).get();
        // Disconnect from session so that the updates on updatedTasklist are not directly saved in db
        em.detach(updatedTasklist);
        updatedTasklist
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restTasklistMockMvc.perform(put("/api/tasklists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTasklist)))
            .andExpect(status().isOk());

        // Validate the Tasklist in the database
        List<Tasklist> tasklistList = tasklistRepository.findAll();
        assertThat(tasklistList).hasSize(databaseSizeBeforeUpdate);
        Tasklist testTasklist = tasklistList.get(tasklistList.size() - 1);
        assertThat(testTasklist.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTasklist.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTasklist() throws Exception {
        int databaseSizeBeforeUpdate = tasklistRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTasklistMockMvc.perform(put("/api/tasklists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tasklist)))
            .andExpect(status().isBadRequest());

        // Validate the Tasklist in the database
        List<Tasklist> tasklistList = tasklistRepository.findAll();
        assertThat(tasklistList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTasklist() throws Exception {
        // Initialize the database
        tasklistService.save(tasklist);

        int databaseSizeBeforeDelete = tasklistRepository.findAll().size();

        // Delete the tasklist
        restTasklistMockMvc.perform(delete("/api/tasklists/{id}", tasklist.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tasklist> tasklistList = tasklistRepository.findAll();
        assertThat(tasklistList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
