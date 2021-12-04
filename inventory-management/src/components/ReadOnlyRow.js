import React from "react";
// ReadOnlyRow component is used to display inventory items already in the database
// All rows are read only except for at most one which is editable
// Read only rows provide buttons to edit or delete a row
const ReadOnlyRow = ({ item, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.amount}</td>
      <td>{item.price}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, item)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
