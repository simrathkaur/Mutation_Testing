package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createTask_ShouldReturnSavedTask() {
        Task task = new Task();
        task.setTitle("New Task");
        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.createTask(task);

        assertEquals("New Task", result.getTitle());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void getAllTasks_ShouldReturnTaskList() {
        Task task = new Task();
        when(taskRepository.findAll()).thenReturn(List.of(task));

        List<Task> tasks = taskService.getAllTasks();

        assertEquals(1, tasks.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void getTaskById_ShouldReturnTaskIfFound() {
        Task task = new Task();
        task.setId(1L);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Task result = taskService.getTaskById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void updateTask_ShouldUpdateAndReturnTask() {
        Task existingTask = new Task();
        existingTask.setId(1L);
        Task updatedTask = new Task();
        updatedTask.setTitle("Updated Task");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(existingTask)).thenReturn(existingTask);

        Task result = taskService.updateTask(1L, updatedTask);

        assertEquals("Updated Task", result.getTitle());
        verify(taskRepository, times(1)).save(existingTask);
    }

    @Test
    void deleteTask_ShouldReturnTrueIfExists() {
        when(taskRepository.existsById(1L)).thenReturn(true);

        boolean result = taskService.deleteTask(1L);

        assertTrue(result);
        verify(taskRepository, times(1)).deleteById(1L);
    }
}
