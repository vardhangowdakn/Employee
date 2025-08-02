package com.newproject.employe.controller;

import com.newproject.employe.entity.Employee;
import com.newproject.employe.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5175")
@RequestMapping("api/emp/")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping("employee")
     public Employee postEmpoyee(@RequestBody Employee employee){
         return employeeService.postEmployee(employee);
     }


    @GetMapping("employee")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }



    @DeleteMapping("employee/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

    @PutMapping("employee/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    @GetMapping("employee/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }
    }


