import { mockInventoryList, mockRecentStockActivity } from './mock/inventoryMockData';

/**
 * Inventory Master API Service
 * 
 * Handles inventory queries, manual stock adjustments, reorder level updates,
 * stock status determination, and auditable movement logs.
 */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Internal in-memory databases
let inventoryDatabase = [...mockInventoryList];
let stockActivityDatabase = [...mockRecentStockActivity];

// Helper to determine status dynamically based on currentStock & reorderLevel
const determineStockStatus = (stock, reorderLevel) => {
  if (stock === 0) return 'Out of Stock';
  if (stock <= reorderLevel) return 'Low Stock';
  return 'In Stock';
};

export const inventoryService = {
  /**
   * Fetch inventory items with search, filters, sorting, and pagination
   */
  async getInventory({
    search = '',
    category = '',
    stockStatus = '',
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    pageSize = 10,
  } = {}) {
    await delay(300);

    let result = [...inventoryDatabase];

    // 1. Search filter (Name, Barcode, Product ID)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.barcode.includes(q) ||
          item.productId.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (category) {
      result = result.filter((item) => item.category === category);
    }

    // 3. Stock Status filter
    if (stockStatus) {
      result = result.filter((item) => item.status === stockStatus);
    }

    // 4. Sorting
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

    // 5. Pagination calculation
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedItems = result.slice(startIndex, startIndex + pageSize);

    return {
      inventory: paginatedItems,
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
   * Get single inventory item by Product ID
   */
  async getInventoryItem(productId) {
    await delay(150);
    const item = inventoryDatabase.find((i) => i.productId === productId);
    if (!item) {
      throw new Error(`Inventory item for product ${productId} not found.`);
    }
    return { ...item };
  },

  /**
   * Manual Stock Adjustment Workflow
   * Validates non-negative stock and records an auditable movement log
   */
  async adjustStock({ productId, adjustmentType, quantity, reason, notes }) {
    await delay(400);

    const index = inventoryDatabase.findIndex((i) => i.productId === productId);
    if (index === -1) {
      throw new Error(`Inventory record for ${productId} not found.`);
    }

    const currentItem = inventoryDatabase[index];
    const qty = Number(quantity);

    if (isNaN(qty) || qty <= 0) {
      throw new Error('Adjustment quantity must be a positive number greater than zero.');
    }

    let newStock = currentItem.currentStock;
    let changeStr = '';
    let changeType = 'positive';

    if (adjustmentType === 'Add Stock') {
      newStock += qty;
      changeStr = `+${qty}`;
      changeType = 'positive';
    } else if (adjustmentType === 'Remove Stock') {
      if (currentItem.currentStock < qty) {
        throw new Error(
          `Insufficient stock for this adjustment. Current stock is ${currentItem.currentStock}, cannot remove ${qty}.`
        );
      }
      newStock -= qty;
      changeStr = `-${qty}`;
      changeType = 'negative';
    } else {
      throw new Error('Invalid adjustment type.');
    }

    // Determine updated status
    const newStatus = determineStockStatus(newStock, currentItem.reorderLevel);

    // Update item in database
    const updatedItem = {
      ...currentItem,
      currentStock: newStock,
      status: newStatus,
      lastUpdated: new Date().toISOString(),
    };
    inventoryDatabase[index] = updatedItem;

    // Create Audit Movement Log
    const movementLog = {
      id: `MOV-${Date.now().toString().slice(-4)}`,
      productId: currentItem.productId,
      productName: currentItem.name,
      change: changeStr,
      changeType,
      movementType: adjustmentType === 'Add Stock' ? 'Restock' : 'Adjustment',
      reason: reason || 'Manual Stock Adjustment',
      notes: notes || '',
      previousStock: currentItem.currentStock,
      newStock,
      updatedBy: 'Admin',
      reference: `REF-ADJ-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      isoTime: new Date().toISOString(),
    };

    stockActivityDatabase.unshift(movementLog);

    return { updatedItem, movementLog };
  },

  /**
   * Update Reorder Level Threshold
   */
  async updateReorderLevel(productId, newLevel) {
    await delay(300);
    const index = inventoryDatabase.findIndex((i) => i.productId === productId);
    if (index === -1) {
      throw new Error(`Inventory item ${productId} not found.`);
    }

    const reorderVal = Number(newLevel);
    if (isNaN(reorderVal) || reorderVal < 0) {
      throw new Error('Reorder level must be a non-negative number.');
    }

    const currentItem = inventoryDatabase[index];
    const newStatus = determineStockStatus(currentItem.currentStock, reorderVal);

    const updatedItem = {
      ...currentItem,
      reorderLevel: reorderVal,
      status: newStatus,
      lastUpdated: new Date().toISOString(),
    };

    inventoryDatabase[index] = updatedItem;
    return { ...updatedItem };
  },

  /**
   * Get Stock Movement History for a specific product
   */
  async getStockHistory(productId) {
    await delay(200);
    return stockActivityDatabase.filter((m) => m.productId === productId);
  },

  /**
   * Get Recent Stock Activity across all products
   */
  async getRecentStockActivity() {
    await delay(200);
    return [...stockActivityDatabase].slice(0, 5);
  },

  /**
   * Summary metric counters for Inventory header cards
   */
  async getInventorySummaryMetrics() {
    await delay(150);
    const total = inventoryDatabase.length;
    const inStock = inventoryDatabase.filter((i) => i.status === 'In Stock').length;
    const lowStock = inventoryDatabase.filter((i) => i.status === 'Low Stock').length;
    const outOfStock = inventoryDatabase.filter((i) => i.status === 'Out of Stock').length;

    return { total, inStock, lowStock, outOfStock };
  }
};
