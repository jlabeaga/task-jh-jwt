package com.mycompany.task.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.task.web.rest.TestUtil;

public class TasklistTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tasklist.class);
        Tasklist tasklist1 = new Tasklist();
        tasklist1.setId(1L);
        Tasklist tasklist2 = new Tasklist();
        tasklist2.setId(tasklist1.getId());
        assertThat(tasklist1).isEqualTo(tasklist2);
        tasklist2.setId(2L);
        assertThat(tasklist1).isNotEqualTo(tasklist2);
        tasklist1.setId(null);
        assertThat(tasklist1).isNotEqualTo(tasklist2);
    }
}
