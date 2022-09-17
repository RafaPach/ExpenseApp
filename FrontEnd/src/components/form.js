import React from 'react';
import { useState } from 'react';
import List from './List';
import { default as api } from '../store/apifetch.js';

export default function Form() {
  let initialValue = {
    name: '',
    type: '',
    amount: '',
  };
  const [newSubmission, setNewSubmission] = useState(initialValue);
  // in order to destructor the postTranscation function we use an array , in this case
  const [postTransaction] = api.usePostTransactionMutation();

  const handleChangeFor = (propertyName) => (e) => {
    setNewSubmission((newSubmission) => ({
      ...newSubmission,
      [propertyName]: e.target.value,
    }));
  };

  async function submitButton(event, data) {
    event.preventDefault();
    if (!data) {
      return 'No data';
    }
    setNewSubmission(initialValue);
    console.log(data);
    await postTransaction(data).unwrap();
  }
  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-2xl">Transation</h1>
      <form id="form">
        <div className="grid gap-4">
          <div className="input-group">
            <input
              value={newSubmission.name}
              type="text"
              placeholder="Name"
              onChange={handleChangeFor('name')}
              className="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            ></input>
          </div>
          <select
            className="form-input"
            value={newSubmission.type}
            onChange={handleChangeFor('type')}
          >
            <option value="" disabled>
              Select your option
            </option>
            <option value="Investments">Investments</option>
            <option value="Expenses">Expenses</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              placeholder="Amount"
              className="form-input"
              onChange={handleChangeFor('amount')}
              value={newSubmission.amount}
            ></input>
          </div>
          <div className="submit-btn">
            <button
              onClick={(event) => {
                submitButton(event, newSubmission);
              }}
              className="border py-2 text-white bg-indigo-500 w-full text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
}
