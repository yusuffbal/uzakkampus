import React from 'react';
import { FaBook, FaClipboardList, FaClock, FaThList } from 'react-icons/fa';

const SummaryCard = ({ title, count }) => {
  // Determine card color based on counts
  const getCardColor = (count) => {
    if (count > 3) {
      return 'bg-danger';
    } else if (count > 1) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  };

  // Determine icon based on title
  const getIcon = (title) => {
    switch (title) {
      case 'Toplam Ders Sayısı':
        return <FaBook />;
      case 'Yaklaşan Sınav Sayısı':
        return <FaClock />;
      case 'Yaklaşan Ödev Sayısı':
        return <FaClipboardList />;
      case 'Yaklaşan Quiz Sayısı':
        return <FaThList />;
      default:
        return null;
    }
  };

  return (
    <div className={`card h-100 flex-grow-1 d-flex align-items-center justify-content-center ${getCardColor(count)}`}>
      <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
        <h5 className="card-title">
          <span className="icon fs-3">{getIcon(title)}</span> {title}
        </h5>
        <p className="card-text fs-5">{count}</p> {/* Countları daha büyük yapmak için fs-5 sınıfını kullanıyoruz */}
      </div>
    </div>
  );
};

export default SummaryCard;
