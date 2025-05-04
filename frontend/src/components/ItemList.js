import React from 'react';
import PropTypes from 'prop-types';

function ItemList({ items, deleteItem, editItem }) {
  if (items.length === 0) {
    return (
      <div className="items-container">
        <p>No items found. Add a new item to get started.</p>
      </div>
    );
  }

  return (
    <div className="items-container">
      <h2>Items List</h2>
      {items.map((item) => (
        <div key={item._id} className="item-card">
          <div className="item-header">
            <h3 className="item-title">{item.name}</h3>
            <div className="item-actions">
              <button 
                className="btn btn-warning" 
                onClick={() => editItem(item)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
          <p className="item-description">{item.description}</p>
          <small>Created: {new Date(item.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

// Add PropTypes validation
ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired
};

export default ItemList;
