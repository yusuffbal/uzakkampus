import BootstrapTable from 'react-bootstrap-table-next';
 
const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true
    },
    {
      dataField: 'course',
      text: 'Course',
      sort: true
    },
    {
      dataField: 'midterm',
      text: 'Midterm',
      sort: true
    },
    {
      dataField: 'final',
      text: 'Final',
      sort: true
    },
    {
      dataField: 'makeup',
      text: 'Makeup',
      sort: true
    },
    {
      dataField: 'grade',
      text: 'Grade',
      sort: true
    }
  ];
 
  const gradingtable = ({ data }) => {
    return (
      <div className="container mt-5">
        <BootstrapTable keyField='id' data={data} columns={columns} />
      </div>
    );
  };
  
  export default gradingtable;