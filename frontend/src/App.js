import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching items. Please try again later.');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item) => {
    try {
      await axios.post(`${API_URL}/items`, item);
      fetchItems();
    } catch (err) {
      setError('Error creating item. Please try again.');
      console.error('Error creating item:', err);
    }
  };

  const updateItem = async (id, item) => {
    try {
      await axios.put(`${API_URL}/items/${id}`, item);
      fetchItems();
      setCurrentItem(null);
    } catch (err) {
      setError('Error updating item. Please try again.');
      console.error('Error updating item:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      fetchItems();
    } catch (err) {
      setError('Error deleting item. Please try again.');
      console.error('Error deleting item:', err);
    }
  };

  const editItem = (item) => {
    setCurrentItem(item);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>CRUD Application</h1>
      </div>
      
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
      
      <ItemForm 
        createItem={createItem} 
        updateItem={updateItem}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ItemList 
          items={items} 
          deleteItem={deleteItem} 
          editItem={editItem} 
        />
      )}
    </div>
  );
}

export default App;
