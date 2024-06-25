import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GradingTable = ({ notes }) => {
  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Ders</th>
          <th>Vize</th>
          <th>Final</th>
          <th>Bütünleme</th>
          <th>Not</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(note => (
          <tr key={note.course.id}>
            <td>{note.course.name}</td>
            <td>{note.midtermNote}</td>
            <td>{note.finalNote}</td>
            <td>{note.integrationNote}</td>
            <td>{note.average}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GradingTable;
