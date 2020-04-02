import React, {useState} from 'react';
import * as fetch from 'node-fetch';

export const App = () => {
  const [payment, setPayment] = useState('$0');
  const [principal, setPrincipal] = useState(0);
  const [term, setTerm] = useState(10);
  const [rate, setRate] = useState(0.0);

  const updatePrincipal = (event) => {
    setPrincipal(event.target.value);
  }

  const updateTerm = (event) => {
    setTerm(event.target.value);
  }

  const updateRate = (event) => {
    setRate(event.target.value / 100);
  }

  const calculateInterest = () => {
    const body = {
      rate,
      term,
      principal
    };
 
    fetch('http://localhost:5000/interest', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => setPayment(`$${json.payment.toLocaleString()}`));
  }

  return(
    <div id = 'container'>
      <div>
        <h1>Mortgage Calculator</h1>
        <div id='container'>
          <p id='label'>Monthly Payment:</p>
          <p>{payment}</p>
        </div>
        <form>
          <label>Loan Amount</label>
          <input id = 'loan' type="number" maxLength="7" placeholder="0" min="0" onChange={updatePrincipal}></input>
          <label>Loan Term</label>
          <select onChange={updateTerm}>
              <option value="10">10 year fixed</option>
              <option value="15">15 year fixed</option>
              <option value="20">20 year fixed</option>
              <option value="30">30 year fixed</option>
          </select>
          <label>Interest Rate</label>
          <input id = 'interest' type="number" maxLength="3" placeholder="0" min="0" step="0.1" onChange={updateRate}></input>
          <input id = 'button' type='button' value='Calculate Interest' onClick={calculateInterest}></input>
        </form>
      </div>
    </div>
  )
}