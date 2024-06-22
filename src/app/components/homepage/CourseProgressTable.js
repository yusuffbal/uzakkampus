
import React from 'react';
const CourseProgressTable = ({ data }) => {
    // Progress bar rengini belirlemek için bir fonksiyon
    const getProgressBarColor = (progress) => {
      if (progress < 50) {
        return 'bg-danger'; // Kırmızı
      } else if (progress >= 50 && progress < 80) {
        return 'bg-warning'; // Sarı
      } else {
        return 'bg-info'; // Mavi
      }
    };
  
    return (
      <div className={`card card-custom align-items-center justify-content-center card-stretch gutter-b`} style={{
        maxHeight: "50vh",
        overflowY: "scroll",
        overflowX: 'hidden'
      }}>
        <div className="table-responsive" style={{ width: '100%', height: '100%' }}>
          <table className="table table-head-custom table-vertical-center" id="kt_advance_table_widget_1" style={{ width: '100%', height: '100%' }}>
            <thead>
              <tr className="text-left">
                <th>Ders Adı</th>
                <th>Eğitmen</th>
                <th>Ders İlerleme Durumu</th>
                <th>Vize Notu</th>
                <th>Final Notu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((course, index) => (
                <tr key={index}>
                  <td className="pl-0">{course.courseName}</td>
                  <td>{course.teacher}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="progress progress-xs w-100 mr-2">
                        <div
                          className={`progress-bar ${getProgressBarColor(course.courseParticipant)}`} 
                          role="progressbar"
                          style={{ width: `${course.courseParticipant}%` }}
                          aria-valuenow={course.courseParticipant}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`text-muted font-size-sm font-weight-bold`}>{course.midtermNote}</span>
                  </td>
                  <td>
                    <span className={`text-muted font-size-sm font-weight-bold`}>{course.finalNote}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default CourseProgressTable