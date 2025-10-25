const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true }); // automatically adds createdAt and updatedAt

// Export the model
module.exports = mongoose.model('Student', studentSchema);
