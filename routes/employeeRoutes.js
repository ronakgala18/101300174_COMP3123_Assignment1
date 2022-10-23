const express = require("express")
const mongoose = require("mongoose")
const employeesModel = require('../models/Employee.js');
const routes1 = express.Router()

// alow user get all employee list
routes1.get("/emp/employees", async (req, res) => {
     try {
         const employee = await employeesModel.find();
         res.status(200).send(employee)
     }
     catch (error) {
         res.status(404).send(error)
     }
 })
 //allow user to create employee
 routes1.post("/emp/employees", async (req, res) => {
    try {
        const newEmployee = new employeesModel(req.body)
        const employee = await newEmployee.save()
        res.status(201).send(employee)
    }
    catch (error) {
        res.status(404).send(error)
    }
})
//User can get employee details by employee id
routes1.get('/emp/employees/:eid', async(req, res) => {
    try{
        const emp = await employeesModel.findById(req.params.eid)
        res.status(200).send(emp)
    }catch(error){
        res.status(400).send(error)
    }
});
//User can update employee details
routes1.put('/emp/employees/:eid', async(req, res) => {
    // Validate request
    try {
        const updatedEmp = await employeesModel.findByIdAndUpdate(req.params.eid, req.body)
        const employee = await updatedEmp.save()
        res.status(200).send(employee);
    }
    catch (error) {
        res.status(404).send(error)
    }
});
//User can delete employee by employee id
routes1.delete('/emp/employees',async (req, res) => {
    // Validate request
    try {
        const deleteEmp = await employeesModel.findByIdAndDelete(req.query.eid)
        res.status(201).send( {message:'Employee deleted successfully'})
       if(!deleteEmp){
        res.send({message: 'Employee not deleted'})
        return
       }
    }
    catch (error) {
        res.status(404).send(error)
    }
});

module.exports = routes1