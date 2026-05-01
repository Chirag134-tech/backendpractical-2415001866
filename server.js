const express = require("express");
const app = express();
app.use(express.json());

// Dummy data
let students = [
  { id: 1, name: "Aman", course: "MERN", age: 21 },
  { id: 2, name: "Riya", course: "Data Science", age: 22 },
  { id: 3, name: "Karan", course: "DevOps", age: 23 },
  { id: 4, name: "Sneha", course: "UI/UX", age: 20 }
];

// Middleware to find student
function findStudent(req, res, next) {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  req.student = student;
  next();
}

// GET all
app.get("/students", (req, res) => {
  res.json(students);
});

// GET one
app.get("/students/:id", findStudent, (req, res) => {
  res.json(req.student);
});

// CREATE
app.post("/students", (req, res) => {
  const { name, course, age } = req.body;
  if (!name || !course || !age)
    return res.status(400).json({ message: "All fields required" });

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name, course, age
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// UPDATE
app.put("/students/:id", findStudent, (req, res) => {
  const { name, course, age } = req.body;
  req.student.name = name || req.student.name;
  req.student.course = course || req.student.course;
  req.student.age = age || req.student.age;
  res.json(req.student);
});

// DELETE
app.delete("/students/:id", findStudent, (req, res) => {
  students = students.filter(s => s.id !== req.student.id);
  res.json({ message: "Deleted successfully" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
