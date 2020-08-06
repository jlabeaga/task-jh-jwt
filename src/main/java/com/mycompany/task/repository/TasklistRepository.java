package com.mycompany.task.repository;

import com.mycompany.task.domain.Tasklist;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Tasklist entity.
 */
@Repository
public interface TasklistRepository extends JpaRepository<Tasklist, Long> {

    @Query(value = "select distinct tasklist from Tasklist tasklist left join fetch tasklist.participants",
        countQuery = "select count(distinct tasklist) from Tasklist tasklist")
    Page<Tasklist> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct tasklist from Tasklist tasklist left join fetch tasklist.participants")
    List<Tasklist> findAllWithEagerRelationships();

    @Query("select tasklist from Tasklist tasklist left join fetch tasklist.participants where tasklist.id =:id")
    Optional<Tasklist> findOneWithEagerRelationships(@Param("id") Long id);
}
