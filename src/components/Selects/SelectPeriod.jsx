/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePeriod } from "../../redux/period";
import { changeLabel } from "../../redux/period";
import { useSelector } from "react-redux";

const options = [
  { value: 6, label: "1 Day" },
  { value: 12, label: "2 Days" },
  { value: 18, label: "3 Days" },
  { value: 24, label: "4 Days" },
  { value: 30, label: "5 Days" },
  { value: 36, label: "6 Days" },
  { value: 42, label: "7 Days" },
  { value: 90, label: "1 Month" },
];

const SelectPeriod = () => {
  const dispatch = useDispatch();
  const { value:period } = useSelector((state) => state.period.period);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value == selectedValue
    );

    setIsLoading(true);
    dispatch(changePeriod(selectedOption.value));
    dispatch(changeLabel(selectedOption.label));
    setIsLoading(false);
  };

  return (
    <div>
      <div className="divSelect">
      <label htmlFor="period">Period</label>
      <select id="period" className="select" value={period} onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      </div>
      {isLoading && <p className="loading">Loading...</p>}
    </div>
  );
};

export default SelectPeriod;
