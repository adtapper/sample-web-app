import React from 'react';

export const App = () => {
  const handleChange = () => {

  }

  const calculateInterest = () => {

  }

  return(
    <div>
      <form>
        <label className='label'>Loan Type</label>
        <select onChange={handleChange}>
            <option value="car-personal-home">Car/Personal/Home</option>
            <option value="credit-card">Credit Card</option>
        </select>
        <label className='label'>Principal</label>
        <input className = 'startDate' type="number" maxLength="7" placeholder="0"></input>
        <label className='label'>Interest Rate</label>
        <input className = 'endDate' type="number" maxLength="3" placeholder="0"></input>
        <label className='label'>Loan Length</label>
        <input className = 'endDate' type="number" maxLength="3" placeholder="0"></input>
        <button onClick={calculateInterest}>Calculate Interest</button>
      </form>
    </div>
  )
}