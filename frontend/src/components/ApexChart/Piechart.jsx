import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({serie,nombre}) => {
  const [series, setSeries] = useState([...nombre]);
  const [options] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
    labels: [...serie],
  });

  const appendData = () => {
    const newValue = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    setSeries([...series, newValue]);
  };

  const removeData = () => {
    if (series.length === 1) return;
    const updatedSeries = series.slice(0, -1);
    setSeries(updatedSeries);
  };

  const randomize = () => {
    const updatedSeries = series.map(
      () => Math.floor(Math.random() * (100 - 1 + 1)) + 1
    );
    setSeries(updatedSeries);
  };

  const reset = () => {
    setSeries([44, 55, 13, 33]);
  };

  return (
    <div>
      <div className='chart-wrap'>
        <div id='chart'>
          <ReactApexChart
            options={options}
            series={series}
            type='donut'
            width={380}
          />
        </div>
      </div>

      <div className='actions'>
        <button onClick={appendData}>+ ADD</button>
        &nbsp;
        <button onClick={removeData}>- REMOVE</button>
        &nbsp;
        <button onClick={randomize}>RANDOMIZE</button>
        &nbsp;
        <button onClick={reset}>RESET</button>
      </div>
    </div>
  );
};

export default PieChart;
