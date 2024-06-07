import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GradingTable = ({ notes }) => {
  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Course</th>
          <th>Midterm</th>
          <th>Final</th>
          <th>Makeup</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(note => (
          <tr key={note.id}>
            <td>{note.course}</td>
            <td>{note.midterm}</td>
            <td>{note.final}</td>
            <td>{note.makeup}</td>
            <td>{note.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GradingTable;
