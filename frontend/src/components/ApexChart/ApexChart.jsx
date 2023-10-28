import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { useGetCommuneChartQuery } from '../../redux/slices/communeApiSlice';

const ApexChart = ({ serie, categories }) => {
  console.log(serie);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        dropShadow: {
          enabled: true,
          top: 13,
          left: 0,
          blur: 10,
          opacity: 0.1,
          color: '#4318FF',
        },
      },
      colors: ['#4318FF'],
      markers: {
        size: 0,
        colors: 'white',
        strokeColors: '#4318FF',
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: 'circle',
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
      },
      tooltip: {
        theme: 'dark',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        type: 'gradient',
      },

      xaxis: {
        categories: [],
        show: false,
        labels: {
          style: {
            colors: '#A3AED0',
            fontSize: '14px',
            fontWeight: '500',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      // grid: {
      //   show: false,
      //   column: {
      //     colors: ['transparent'], // takes an array which will be repeated on columns
      //     opacity: 0.5,
      //   },
      // },
      grid: {
        show: false,
        strokeDashArray: 5,
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          colorStops: [
            [
              {
                offset: 0,
                color: '#0ea5e9',
                opacity: 1,
              },
              {
                offset: 100,
                color: 'rgba(67, 24, 255, 1)',
                opacity: 0.28,
              },
            ],
          ],
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '40px',
          horizontal: true,
        },
      },
    },
  });
  useEffect(() => {
    if (serie && categories) {
      setChartData((prevData) => ({
        ...prevData,
        series: [{ data: serie }],
        options: {
          ...prevData.options,
          xaxis: { categories },
        },
      }));
    }
  }, [serie, categories]);

  return (
    <div id='chart'>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height={400}
        width='100%'
      />
    </div>
  );
};

export default ApexChart;
