import React, { useState } from 'react';
import Gradingtable from '../components/gradingpage/gradingtable';

const GradingPage = () => {
  const [notes, setNotes] = useState([
    { id: 1, course: 'Math', midterm: 80, final: 90, makeup: 85, grade: 88 },
    { id: 2, course: 'Science', midterm: 70, final: 85, makeup: 80, grade: 82 },
    { id: 3, course: 'History', midterm: 75, final: 80, makeup: 78, grade: 79 },
  ]);

  
  return (
    <div>
      <Gradingtable data={notes} />
    </div>
  );
}

export default GradingPage;
