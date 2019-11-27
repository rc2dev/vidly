import React from 'react';

const ListGroup = props => {
  const {
    items,
    selectedItem,
    valueProperty,
    textProperty,
    onItemSelect
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem === item ? 'list-group-item active' : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: '_id',
  textProperty: 'name'
};

export default ListGroup;
