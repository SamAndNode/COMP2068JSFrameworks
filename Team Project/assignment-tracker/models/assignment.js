const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'In Progress'
    },
    category: {
        type: String,
        enum: ['Homework', 'Project', 'Exam', 'Other'],
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('assignment', AssignmentSchema);