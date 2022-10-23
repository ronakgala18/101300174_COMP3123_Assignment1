const mongoose = require('mongoose')
const options = ["Male", "Female", "Other","male", "female","other","MALE","FEMALE","OTHER"]

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxLength: 100,
        required: [true, "First name is required"]
    },
    last_name: {
        type: String,
        maxLength: 50,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    },
    gender: {
        type: String,
        maxLength: 25,
        lowercase: true,
        validate(value) {
            if (!options.includes(value)) throw new Error("Gender should be set to Male, Female, or Other.")
        }
    },
    salary: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error("Salary cannot be negative")
        }
    },
})

module.exports = mongoose.model("employees", employeeSchema)