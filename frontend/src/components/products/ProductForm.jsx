import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CATEGORIES, STATUS_OPTIONS } from './ProductFilters';
import { productService } from '../../services/productService';

export const ProductForm = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  const isEditing = Boolean(initialData?.id);

  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    category: '',
    price: '',
    weightValue: '',
    weightUnit: 'g',
    ingredients: '',
    stock: '0',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        barcode: initialData.barcode || '',
        category: initialData.category || '',
        price: initialData.price?.toString() || '',
        weightValue: initialData.weightValue?.toString() || '',
        weightUnit: initialData.weightUnit || 'g',
        ingredients: initialData.ingredients || '',
        stock: initialData.stock?.toString() || '0',
        status: initialData.status || 'Active',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = async () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required.';
    }

    if (!formData.barcode.trim()) {
      newErrors.barcode = 'Barcode is required.';
    } else {
      // Barcode uniqueness check
      const isAvailable = await productService.checkBarcodeAvailability(
        formData.barcode.trim(),
        initialData?.id
      );
      if (!isAvailable) {
        newErrors.barcode = `Product with barcode "${formData.barcode.trim()}" already exists.`;
      }
    }

    if (!formData.category) {
      newErrors.category = 'Category selection is required.';
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Selling price must be a number greater than 0.';
    }

    if (!formData.weightValue || isNaN(Number(formData.weightValue)) || Number(formData.weightValue) <= 0) {
      newErrors.weightValue = 'Weight value must be a number greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;

    onSubmit({
      ...formData,
      price: Number(formData.price),
      weightValue: Number(formData.weightValue),
      stock: Number(formData.stock || 0),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Product Name */}
      <Input
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g. Amul Taaza Toned Milk (1L)"
        error={errors.name}
        required
        disabled={isSubmitting}
      />

      {/* Barcode & Category Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Barcode (Unique Identifier)"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          placeholder="e.g. 8901234567890"
          error={errors.barcode}
          required
          disabled={isSubmitting}
        />

        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={CATEGORIES}
          placeholder="Select category"
          error={errors.category}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Selling Price & Catalog Weight Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-5">
          <Input
            label="Selling Price (₹)"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 68"
            error={errors.price}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="sm:col-span-4">
          <Input
            label="Catalog Weight"
            name="weightValue"
            type="number"
            step="0.1"
            value={formData.weightValue}
            onChange={handleChange}
            placeholder="e.g. 500"
            error={errors.weightValue}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="sm:col-span-3">
          <Select
            label="Unit"
            name="weightUnit"
            value={formData.weightUnit}
            onChange={handleChange}
            options={[
              { value: 'g', label: 'g (Grams)' },
              { value: 'kg', label: 'kg (Kilograms)' },
              { value: 'ml', label: 'ml (Milliliters)' },
              { value: 'L', label: 'L (Liters)' },
            ]}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Stock Reference & Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Stock Reference (Initial)"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="e.g. 42"
          disabled={isSubmitting}
        />

        <Select
          label="Product Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={STATUS_OPTIONS}
          disabled={isSubmitting}
        />
      </div>

      {/* Ingredients Area */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          Ingredients / Specifications
        </label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          rows={2}
          placeholder="e.g. Toned Pasteurized Milk, Fat 3.0%, SNF 8.5%"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
        />
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          type="submit"
          loading={isSubmitting}
          loadingText={isEditing ? 'Saving...' : 'Adding...'}
        >
          {isEditing ? 'Save Changes' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
