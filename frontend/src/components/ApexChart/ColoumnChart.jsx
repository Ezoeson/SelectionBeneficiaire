import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ColoumnChart = ({ Note, Personne }) => {
  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

  const [series, setSeries] = useState([
    {
      data: [...Note],
    },
  ]);

  const [options] = useState({
    chart: {
      height: 300,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '10%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [...Personne],
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
  });

  return (
    <div id='chart'>
      <ReactApexChart
        options={options}
        series={series}
        type='bar'
        height={350}
      />
    </div>
  );
};
export default ColoumnChart;
