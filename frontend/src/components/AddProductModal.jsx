import React, { useState } from 'react';

function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price || Number(price) <= 0) {
      setError('Please enter a valid product name and price');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onAddProduct(name.trim(), price);
      setName('');
      setPrice('');
    } catch (err) {
      setError(err.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2>Add New Product</h2>
        <p>Fill in the details to publish your product to the store</p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="e.g. Graphic T-Shirt"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Price (USD)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 120"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
