package com.mycompany.task.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.task.domain.enumeration.TaskStatus;

import com.mycompany.task.domain.enumeration.TaskResult;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "date_created", nullable = false)
    private LocalDate dateCreated;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TaskStatus status;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "result", nullable = false)
    private TaskResult result;

    @Column(name = "estimated_hours")
    private Float estimatedHours;

    @OneToMany(mappedBy = "task")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Action> actions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "tasks", allowSetters = true)
    private User owner;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "task_resources",
               joinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "resources_id", referencedColumnName = "id"))
    private Set<Resource> resources = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "tasks", allowSetters = true)
    private Tasklist tasklist;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Task name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Task description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public Task dateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Task dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public Task status(TaskStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskResult getResult() {
        return result;
    }

    public Task result(TaskResult result) {
        this.result = result;
        return this;
    }

    public void setResult(TaskResult result) {
        this.result = result;
    }

    public Float getEstimatedHours() {
        return estimatedHours;
    }

    public Task estimatedHours(Float estimatedHours) {
        this.estimatedHours = estimatedHours;
        return this;
    }

    public void setEstimatedHours(Float estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public Set<Action> getActions() {
        return actions;
    }

    public Task actions(Set<Action> actions) {
        this.actions = actions;
        return this;
    }

    public Task addActions(Action action) {
        this.actions.add(action);
        action.setTask(this);
        return this;
    }

    public Task removeActions(Action action) {
        this.actions.remove(action);
        action.setTask(null);
        return this;
    }

    public void setActions(Set<Action> actions) {
        this.actions = actions;
    }

    public User getOwner() {
        return owner;
    }

    public Task owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public Task resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public Task addResources(Resource resource) {
        this.resources.add(resource);
        resource.getTasks().add(this);
        return this;
    }

    public Task removeResources(Resource resource) {
        this.resources.remove(resource);
        resource.getTasks().remove(this);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }

    public Tasklist getTasklist() {
        return tasklist;
    }

    public Task tasklist(Tasklist tasklist) {
        this.tasklist = tasklist;
        return this;
    }

    public void setTasklist(Tasklist tasklist) {
        this.tasklist = tasklist;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", result='" + getResult() + "'" +
            ", estimatedHours=" + getEstimatedHours() +
            "}";
    }
}
