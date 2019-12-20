import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      id="query"
      type="text"
      value={value}
      placeholder="Search ..."
      onChange={e => onChange(e.target.value)}
      className="form-control"
    />
  );
};

export default SearchBox;
