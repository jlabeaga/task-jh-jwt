package com.mycompany.task.repository;

import com.mycompany.task.domain.Action;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Action entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

    @Query("select action from Action action where action.owner.login = ?#{principal.username}")
    List<Action> findByOwnerIsCurrentUser();
}
