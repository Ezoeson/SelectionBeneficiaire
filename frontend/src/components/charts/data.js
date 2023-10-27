export const pieChartOptions = {
  labels: ["L1", "L2", "L3", "M1", "M2"],
  colors: ["#2B0B3F", "#2D87BB", "#EA5F89", "#9B3192", "#57167E"],
  chart: {
    width: "100px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#2B0B3F", "#2D87BB", "#EA5F89", "#9B3192", "#57167E"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000",
    },
  },
};
