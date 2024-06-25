import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import Chart from 'chart.js/auto';

const CourseStats = ({ notes }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const chartRef = useRef(null);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const courseNotes = notes.filter(note => note.course.name === selectedCourse);

  const calculateAverage = (type) => {
    if (courseNotes.length === 0) return 0;
    const total = courseNotes.reduce((sum, note) => sum + note[type], 0);
    return (total / courseNotes.length).toFixed(2);
  };

  const data = {
    labels: ['Vize', 'Final', 'Bütünleme'],
    datasets: [
      {
        label: `${selectedCourse} Notları`,
        data: courseNotes.length ? [courseNotes[0].midtermNote, courseNotes[0].finalNote, courseNotes[0].integrationNote] : [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: `${selectedCourse} Sınıf Ortalaması`,
        data: [calculateAverage('midtermNote'), calculateAverage('finalNote'), calculateAverage('integrationNote')],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      }
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
        <Form.Label>Ders Seç</Form.Label>
        <Form.Control as="select" value={selectedCourse} onChange={handleCourseChange}>
          <option value="">Bir ders seçin...</option>
          {notes.map(note => (
            <option key={note.course.id} value={note.course.name}>
              {note.course.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default CourseStats;
