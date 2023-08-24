/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeDays } from "../../redux/days";
import { changeLabel } from "../../redux/days";
import { useSelector } from "react-redux";


const options = [
  { value: 1, label: "Day" },
  { value: 7, label: "Week" },
  { value: 30, label: "Month" },
  { value: 365, label: "Year" },
  { value: "max", label: "ALL" },
];

const SelectDays = () => {
  const dispatch = useDispatch();
  const { value:days } = useSelector((state) => state.days.days);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value == selectedValue
    );

    setIsLoading(true);
    dispatch(changeDays(selectedOption.value));
    dispatch(changeLabel(selectedOption.label));
    setIsLoading(false);
  };

  return (
    <div>
      <div className="divSelect">
      <label htmlFor="days">Days</label>
      <select id="days" className="select" value={days} onChange={handleChange}>
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

export default SelectDays;
