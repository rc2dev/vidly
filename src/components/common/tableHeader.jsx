import React, { Component } from 'react';

// columns: array

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { path };
    if (path === this.props.sortColumn.path) {
      sortColumn.order = this.props.sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
