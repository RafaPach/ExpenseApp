import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './labels';
import { chart_Data } from '../AveragePercentage';
import { default as api } from '../store/apifetch.js';
import { getTotal } from '../AveragePercentage';

// const config = {
//   data: {
//     datasets: [
//       {
//         label: 'My First Dataset',
//         data: [300, 50, 100],
//         backgroundColor: [
//           'rgb(255, 99, 132)',
//           'rgb(54, 162, 235)',
//           'rgb(255, 205, 86)',
//         ],
//         hoverOffset: 4,
//         borderRadius: 30,
//         spacing: 10,
//       },
//     ],
//   },
//   options: {
//     cutout: 100,
//   },
// };

Chart.register(ArcElement);
export default function Graph() {
  const { data } = api.useGetLabelsQuery();
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          <Doughnut {...chart_Data(data)}></Doughnut>
          <h3 className="font-bold text-xl title">
            Total
            <span className="block text-3xl text-emerald-400">
              ${getTotal(data) ?? 0}
            </span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4 w-full">
          {/* labels /> */}
          <Labels></Labels>
        </div>
      </div>
    </div>
  );
}
