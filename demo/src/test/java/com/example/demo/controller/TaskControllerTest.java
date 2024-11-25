package com.example.demo.controller;

import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    void setUp() {
        // Initialize mocks
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createTask_ShouldReturnCreatedTask() {
        Task task = new Task();
        task.setTitle("New Task");

        when(taskService.createTask(task)).thenReturn(task);

        ResponseEntity<Task> response = taskController.createTask(task);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("New Task", response.getBody().getTitle());
    }

    @Test
    void getAllTasks_ShouldReturnListOfTasks() {
        Task task = new Task();
        when(taskService.getAllTasks()).thenReturn(List.of(task));

        ResponseEntity<List<Task>> response = taskController.getAllTasks();

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    void getTaskById_ShouldReturnTaskIfExists() {
        Task task = new Task();
        task.setId(1L);
        when(taskService.getTaskById(1L)).thenReturn(task);

        ResponseEntity<Task> response = taskController.getTaskById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1L, response.getBody().getId());
    }

    @Test
    void deleteTask_ShouldReturnNoContentIfDeleted() {
        when(taskService.deleteTask(1L)).thenReturn(true);

        ResponseEntity<Void> response = taskController.deleteTask(1L);

        assertEquals(204, response.getStatusCodeValue());
        verify(taskService, times(1)).deleteTask(1L);
    }
}
