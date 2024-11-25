package com.example.demo;

import com.example.demo.model.Task;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TaskTest {

    @Test
    public void testTaskGettersAndSetters() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setDescription("This is a test task");
        task.setCompleted(true);

        assertEquals("Test Task", task.getTitle());
        assertEquals("This is a test task", task.getDescription());
        assertTrue(task.isCompleted());
    }
}
