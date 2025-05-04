import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ItemForm({ createItem, updateItem, currentItem, setCurrentItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setDescription(currentItem.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [currentItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (currentItem) {
      updateItem(currentItem._id, { name, description });
    } else {
      createItem({ name, description });
    }

    // Reset form
    setName('');
    setDescription('');
  };

  const cancelEdit = () => {
    setCurrentItem(null);
    setName('');
    setDescription('');
  };

  return (
    <div className="form-container">
      <h2>{currentItem ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="3"
          ></textarea>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">
            {currentItem ? 'Update' : 'Add'} Item
          </button>
          {currentItem && (
            <button type="button" className="btn btn-danger" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Add PropTypes validation
ItemForm.propTypes = {
  createItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  setCurrentItem: PropTypes.func.isRequired,
  currentItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

// Default props
ItemForm.defaultProps = {
  currentItem: null
};

export default ItemForm;
