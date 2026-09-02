import { mockProductsList } from './mock/productMockData';

/**
 * Product Master API Service
 * 
 * Handles CRUD operations, search, category/status filtering,
 * barcode uniqueness validation, and pagination.
 */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Internal in-memory store
let productsDatabase = [...mockProductsList];

export const productService = {
  /**
   * Fetch products with search, filtering, sorting, and pagination
   */
  async getProducts({
    search = '',
    category = '',
    status = '',
    stockFilter = '',
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    pageSize = 10,
  } = {}) {
    await delay(300);

    let result = [...productsDatabase];

    // 1. Search filter (Name, Barcode, Product ID)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.barcode.includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // 3. Status filter
    if (status) {
      result = result.filter((p) => p.status === status);
    }

    // 4. Stock Level filter
    if (stockFilter) {
      if (stockFilter === 'In Stock') {
        result = result.filter((p) => p.stock > 10);
      } else if (stockFilter === 'Low Stock') {
        result = result.filter((p) => p.stock > 0 && p.stock <= 10);
      } else if (stockFilter === 'Out of Stock') {
        result = result.filter((p) => p.stock === 0);
      }
    }

    // 5. Sorting
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // 6. Pagination calculation
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedItems = result.slice(startIndex, startIndex + pageSize);

    return {
      products: paginatedItems,
      pagination: {
        totalItems,
        totalPages,
        currentPage,
        pageSize,
        startIndex: totalItems === 0 ? 0 : startIndex + 1,
        endIndex: Math.min(startIndex + pageSize, totalItems),
      },
    };
  },

  /**
   * Get single product by ID
   */
  async getProductById(id) {
    await delay(150);
    const product = productsDatabase.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return { ...product };
  },

  /**
   * Check if a barcode is available (not assigned to another product)
   */
  async checkBarcodeAvailability(barcode, excludeId = null) {
    const cleanBarcode = barcode.trim();
    const existing = productsDatabase.find(
      (p) => p.barcode === cleanBarcode && p.id !== excludeId
    );
    return !existing;
  },

  /**
   * Create new product master record
   */
  async createProduct(productData) {
    await delay(400);

    const cleanBarcode = productData.barcode.trim();

    // Check barcode uniqueness
    const isBarcodeAvailable = await this.checkBarcodeAvailability(cleanBarcode);
    if (!isBarcodeAvailable) {
      throw new Error(`Product with barcode ${cleanBarcode} already exists.`);
    }

    const newId = `PRD-${Date.now().toString().slice(-4)}`;

    const newProduct = {
      id: newId,
      name: productData.name.trim(),
      barcode: cleanBarcode,
      category: productData.category,
      price: Number(productData.price),
      weightValue: Number(productData.weightValue),
      weightUnit: productData.weightUnit || 'g',
      ingredients: productData.ingredients?.trim() || '',
      stock: Number(productData.stock || 0),
      status: productData.status || 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    productsDatabase.unshift(newProduct);
    return { ...newProduct };
  },

  /**
   * Update existing product master record
   */
  async updateProduct(id, productData) {
    await delay(400);

    const index = productsDatabase.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    const cleanBarcode = productData.barcode.trim();

    // Check barcode uniqueness excluding current product
    const isBarcodeAvailable = await this.checkBarcodeAvailability(cleanBarcode, id);
    if (!isBarcodeAvailable) {
      throw new Error(`Product with barcode ${cleanBarcode} already exists.`);
    }

    const updatedProduct = {
      ...productsDatabase[index],
      name: productData.name.trim(),
      barcode: cleanBarcode,
      category: productData.category,
      price: Number(productData.price),
      weightValue: Number(productData.weightValue),
      weightUnit: productData.weightUnit || 'g',
      ingredients: productData.ingredients?.trim() || '',
      stock: Number(productData.stock ?? productsDatabase[index].stock),
      status: productData.status || productsDatabase[index].status,
      updatedAt: new Date().toISOString(),
    };

    productsDatabase[index] = updatedProduct;
    return { ...updatedProduct };
  },

  /**
   * Deactivate product (Sets status to Inactive to preserve transaction history)
   */
  async deactivateProduct(id) {
    await delay(300);
    const index = productsDatabase.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    productsDatabase[index].status = 'Inactive';
    productsDatabase[index].updatedAt = new Date().toISOString();

    return { ...productsDatabase[index] };
  },

  /**
   * Delete product permanently if required
   */
  async deleteProduct(id) {
    await delay(300);
    productsDatabase = productsDatabase.filter((p) => p.id !== id);
    return true;
  },

  /**
   * Get summary metric counters for Products header cards
   */
  async getProductSummaryMetrics() {
    await delay(150);
    const total = productsDatabase.length;
    const active = productsDatabase.filter((p) => p.status === 'Active').length;
    const inactive = productsDatabase.filter((p) => p.status === 'Inactive').length;
    const lowStock = productsDatabase.filter((p) => p.stock > 0 && p.stock <= 10).length;

    return { total, active, inactive, lowStock };
  }
};
