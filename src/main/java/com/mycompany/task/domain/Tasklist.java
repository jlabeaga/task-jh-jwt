package com.mycompany.task.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Tasklist.
 */
@Entity
@Table(name = "tasklist")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Tasklist implements Serializable {

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

    @OneToMany(mappedBy = "tasklist")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "tasklist_participants",
               joinColumns = @JoinColumn(name = "tasklist_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "participants_id", referencedColumnName = "id"))
    private Set<User> participants = new HashSet<>();

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

    public Tasklist name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Tasklist description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Tasklist tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Tasklist addTasks(Task task) {
        this.tasks.add(task);
        task.setTasklist(this);
        return this;
    }

    public Tasklist removeTasks(Task task) {
        this.tasks.remove(task);
        task.setTasklist(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Set<User> getParticipants() {
        return participants;
    }

    public Tasklist participants(Set<User> users) {
        this.participants = users;
        return this;
    }

    public Tasklist addParticipants(User user) {
        this.participants.add(user);
        return this;
    }

    public Tasklist removeParticipants(User user) {
        this.participants.remove(user);
        return this;
    }

    public void setParticipants(Set<User> users) {
        this.participants = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tasklist)) {
            return false;
        }
        return id != null && id.equals(((Tasklist) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tasklist{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
