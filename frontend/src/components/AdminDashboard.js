import { useState } from "react";
import { useWalletStore } from "../store/walletStore";

export default function AdminDashboard() {
  const [teacherName, setTeacherName] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("");
  const [studentName, setStudentName] = useState("");
  const { addTeacher, addStudent, error } = useWalletStore();

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (teacherName && teacherSubject) {
      await addTeacher(teacherName, teacherSubject);
      setTeacherName("");
      setTeacherSubject("");
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (studentName) {
      await addStudent(studentName);
      setStudentName("");
    }
  };

  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <h3>Admin</h3>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <form onSubmit={handleAddTeacher} style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Teacher Name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <input
          placeholder="Subject"
          value={teacherSubject}
          onChange={(e) => setTeacherSubject(e.target.value)}
        />
        <button type="submit">Add Teacher</button>
      </form>
      <form onSubmit={handleAddStudent} style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
