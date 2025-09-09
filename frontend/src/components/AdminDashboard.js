import { useState } from 'react';

export default function AdminDashboard() {
  const [teacher, setTeacher] = useState('');
  const [student, setStudent] = useState('');
  const [subject, setSubject] = useState('');

  const assignTeacher = (e) => {
    e.preventDefault();
    // TODO: Call contract to assign teacher to subject
    alert(`Assign teacher ${teacher} to ${subject}`);
  };

  const assignStudent = (e) => {
    e.preventDefault();
    // TODO: Call contract to assign student to subject
    alert(`Assign student ${student} to ${subject}`);
  };

  const processResults = () => {
    // TODO: Call admin process
    alert('Processing results...');
  };

  const publishResults = () => {
    // TODO: Call admin publish
    alert('Publishing results...');
  };

  return (
    <div style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h3>Admin</h3>
      <form onSubmit={assignTeacher} style={{ display: 'flex', gap: 8 }}>
        <input placeholder="Teacher address" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
        <input placeholder="Subject id" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <button type="submit">Assign Teacher</button>
      </form>
      <form onSubmit={assignStudent} style={{ display: 'flex', gap: 8 }}>
        <input placeholder="Student address" value={student} onChange={(e) => setStudent(e.target.value)} />
        <input placeholder="Subject id" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <button type="submit">Assign Student</button>
      </form>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={processResults}>Process Results</button>
        <button onClick={publishResults}>Publish Results</button>
      </div>
    </div>
  );
}


