import { useState } from 'react';
import { generateResultPDF } from '../utils/pdf';

export default function StudentDashboard() {
  const [subjects, setSubjects] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [classLabel, setClassLabel] = useState('PENDING');

  const download = () => {
    const doc = generateResultPDF({
      name: 'Student Name',
      rollNo: 'ROLL001',
      subjects,
      percentage,
      classLabel,
      hashToSign: '0x',
    });
    doc.save('result.pdf');
  };

  return (
    <div style={{ padding: 24 }}>
      <h3>Student</h3>
      <div>
        <p>Percentage: {percentage.toFixed(2)}%</p>
        <p>Status: {classLabel}</p>
      </div>
      <button onClick={download}>Download Result PDF</button>
    </div>
  );
}


