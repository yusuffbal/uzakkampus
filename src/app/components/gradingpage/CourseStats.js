import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import Chart from 'chart.js/auto';

const CourseStats = ({ notes }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const chartRef = useRef(null);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const courseNotes = notes.filter(note => note.course === selectedCourse);

  const data = {
    labels: ['Midterm', 'Final', 'Makeup'],
    datasets: [
      {
        label: `${selectedCourse} Grades`,
        data: courseNotes.length ? [courseNotes[0].midterm, courseNotes[0].final, courseNotes[0].makeup] : [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [selectedCourse, notes]);

  return (
    <div>
      <Form.Group controlId="courseSelect">
        <Form.Label>Select Course</Form.Label>
        <Form.Control as="select" value={selectedCourse} onChange={handleCourseChange}>
          <option value="">Select a course...</option>
          {notes.map(note => (
            <option key={note.id} value={note.course}>
              {note.course}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default CourseStats;
