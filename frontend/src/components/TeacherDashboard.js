import { useState } from 'react';

export default function TeacherDashboard() {
  const [subject, setSubject] = useState('');
  const [student, setStudent] = useState('');
  const [marks, setMarks] = useState('');

  const submit = (e) => {
    e.preventDefault();
    // TODO: submit marks via contract
    alert(`Submit marks ${marks} for ${student} in ${subject}`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h3>Teacher</h3>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
        <input placeholder="Subject id" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input placeholder="Student address" value={student} onChange={(e) => setStudent(e.target.value)} />
        <input placeholder="Marks" value={marks} onChange={(e) => setMarks(e.target.value)} />
        <button type="submit">Submit Marks</button>
      </form>
    </div>
  );
}


