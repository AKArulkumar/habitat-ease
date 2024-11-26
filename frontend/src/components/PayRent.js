import React, { useState } from "react";

const PayRent = () => {
  const [unit, setUnit] = useState(0);
  const [rentAmount, setRentAmount] = useState(0);

  const calculateRent = () => {
    const pricePerUnit = 10; // Example price per unit for electricity
    const baseRent = 8000; // Example base rent for 1 BHK
    const totalAmount = baseRent + unit * pricePerUnit;
    setRentAmount(totalAmount);
  };

  return (
    <div className="pay-rent">
      <h2>Pay Rent</h2>
      <label>Electricity Units:</label>
      <input
        type="number"
        value={unit}
        onChange={(e) => setUnit(Number(e.target.value))}
      />
      <button onClick={calculateRent}>Calculate Rent</button>
      <h3>Total Rent: ₹{rentAmount}</h3>
    </div>
  );
};

export default PayRent;
