"use client"

import "./css/select-style.css"

export const Select = ({ options, onSelect }: {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return <select
    onChange={(e) => onSelect(e.target.value)}
    className="select-dropdown"
  >
    {options.map((option) => (
      <option key={option.key} value={option.key}>
        {option.value}
      </option>
    ))}
  </select>
}