import React from 'react';
import { default as api } from '../store/apifetch.js';
import { getSum } from '../AveragePercentage/index.js';
import { getLabels } from '../AveragePercentage/index.js';
export default function Labels() {
  //  When making a request, you're able to track the state in several ways. useQuery provides utility booleans like isLoading, isFetching, isSuccess, and isError for the latest request.

  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

  let Info;
  if (isFetching) {
    Info = <div>Fetching</div>;
  } else if (isError) {
    Info = <div>Error Fetching</div>;
  } else if (isSuccess) {
    getSum(data);
    Info = (
      <>
        {getLabels(data, 'type').map((item, i) => (
          <div
            key={i}
            className="labels flex justify-between mt-2 bg-gray-50 py-2 rounded-r"
          >
            <div className="flex gap-4">
              <div
                className="w-2 h-2 rounded py-4"
                style={{ background: item.color ?? '#f9c74f' }}
              ></div>
              <h3 className="text-lg">{item.type ?? ''}</h3>
            </div>
            <h3 className="font-bold text-lg">
              {Math.round(item.percent) ?? 0}%
            </h3>
          </div>
        ))}
      </>
    );
  }
  return <>{Info}</>;
}
