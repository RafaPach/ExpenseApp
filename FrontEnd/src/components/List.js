import React from 'react';
import { default as api } from '../store/apifetch.js';
import { BsTrash } from 'react-icons/bs';

export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();

  async function deleteItem(e) {
    console.log(e.currentTarget.id);
    await deleteTransaction(e.currentTarget.id).unwrap();
  }

  let Info;
  if (isFetching) {
    Info = <div>Fetching</div>;
  } else if (isError) {
    Info = <div>Error Fetching</div>;
  } else if (isSuccess) {
    Info = (
      <>
        <div className="flex flex-col py-6 gap-5">
          <h1 className="py4 font-bold text-2xl"> History</h1>
          {data.map((item) => (
            <Transaction
              key={item.name}
              category={item}
              handlerClick={deleteItem}
            ></Transaction>
          ))}
        </div>
      </>
    );
  }
  return <>{Info}</>;
}

function Transaction({ category, handlerClick }) {
  if (!category) return;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? '#e5e5e5'}` }}
    >
      <button className="px-3">
        <BsTrash
          style={{ color: `${category.color ?? '#e5e5e5'}` }}
          size={20}
          id={category._id}
          onClick={handlerClick}
        ></BsTrash>
      </button>
      <span className="block w-full text-lg">{category.name ?? ''}</span>
    </div>
  );
}
