import { Chart } from "chart.js";
import { useEffect, useRef } from "react";

const GradeChart = ({ studentData, classAverage }) => {
  // Grafik bileşenine ait canvas'ı oluşturmadan önce önceki canvas'ı yok etmek için useRef kullanabilirsiniz
  const chartRef = useRef(null);

  // Grafik bileşeninde kullanılacak verileri hazırlayın

  useEffect(() => {
    // Önceki canvas'ı yok et
    if (chartRef && chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    // Yeni canvas'ı oluştur
    const ctx = chartRef.current.getContext("2d");
    chartRef.current.chartInstance = new Chart(ctx, {
      // Grafik yapılandırması
    });
  }, [studentData, classAverage]);

  return <canvas ref={chartRef} />;
};

export default GradeChart;