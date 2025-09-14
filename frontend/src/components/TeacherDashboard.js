import { useState } from "react";
import { useWalletStore } from "../store/walletStore";

export default function TeacherDashboard() {
  const { addMarks, error } = useWalletStore();
  const [studentIndex, setStudentIndex] = useState("");
  const [teacherIndex, setTeacherIndex] = useState("");
  const [mark, setMark] = useState("");

  const submitMarks = async (e) => {
    e.preventDefault();
    const sIndex = Number(studentIndex);
    const tIndex = Number(teacherIndex);
    const m = Number(mark);
    if (!isNaN(sIndex) && !isNaN(tIndex) && !isNaN(m)) {
      await addMarks(sIndex, tIndex, m);
      setStudentIndex("");
      setTeacherIndex("");
      setMark("");
    } else {
      alert("Please enter valid numbers for student, teacher, and marks.");
    }
  };
  return (
    <div style={{ padding: 24 }}>
      <h3>Teacher</h3>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <form onSubmit={submitMarks} style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Student Index"
          type="number"
          value={studentIndex}
          onChange={(e) => setStudentIndex(e.target.value)}
        />
        <input
          placeholder="Teacher Index"
          type="number"
          value={teacherIndex}
          onChange={(e) => setTeacherIndex(e.target.value)}
        />
        <input
          placeholder="Marks"
          type="number"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
        />
        <button type="submit">Submit Marks</button>
      </form>
    </div>
  );
}
