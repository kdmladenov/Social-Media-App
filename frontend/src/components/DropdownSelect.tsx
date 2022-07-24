import React from 'react';
import DropdownSelectProps from '../types/components/DropdownSelectProps';
import './styles/DropdownSelect.css';

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  name,
  updateQuery,
  query,
  labelStart,
  optionsMap
}) => {
  const selected = optionsMap.find((item) => item['value'] === query[name]);

  return (
    <select
      className="dropdown_select"
      name={name}
      onChange={(e) => {
        updateQuery(e.target.name, e.target.value);
      }}
    >
      <option value="">{`${labelStart}: ${selected?.label}`}</option>
      {optionsMap
        .filter((item) => item?.value !== query[name])
        .map((item) => (
          <option key={item?.label} value={item?.value}>
            {item?.label}
          </option>
        ))}
    </select>
  );
};

export default DropdownSelect;
