import { SortStrategy } from "./sortStrategies";
// Concrete Strategy: Sort by Name A-Z
class SortByNameAsc extends SortStrategy {
  sort(cabins) {
    return cabins.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
}

// Concrete Strategy: Sort by Name Z-A
class SortByNameDesc extends SortStrategy {
  sort(cabins) {
    return cabins.slice().sort((a, b) => b.name.localeCompare(a.name));
  }
}

// Concrete Strategy: Sort by Price Low to High
class SortByPriceAsc extends SortStrategy {
  sort(cabins) {
    return cabins.slice().sort((a, b) => a.regularPrice - b.regularPrice);
  }
}

// Concrete Strategy: Sort by Price High to Low
class SortByPriceDesc extends SortStrategy {
  sort(cabins) {
    return cabins.slice().sort((a, b) => b.regularPrice - a.regularPrice);
  }
}

// Concrete Strategy: Sort by Max Capacity High to Low
class SortByCapacityDesc extends SortStrategy {
  sort(cabins) {
    return cabins.slice().sort((a, b) => b.maxCapacity - a.maxCapacity);
  }
}

// Concrete Strategy: Sort by Max Capacity Low to High
class SortByCapacityAsc extends SortStrategy {
  sort(cabins) {
    return cabins.slice().sort((a, b) => a.maxCapacity - b.maxCapacity);
  }
}

// Concrete Strategy: Sort by Discounts High To Low
class SortByDiscountDesc extends SortStrategy {
  sort(cabins) {
    return cabins.slice().sort((a, b) => b.discount - a.discount);
  }
}

// Concrete Strategy: Sort by Discounts Low To High
class SortByDiscountAsc extends SortStrategy {
  sort(cabins) {
    return cabins.slice().sort((a, b) => a.discount - b.discount);
  }
}

export {
  SortByNameAsc,
  SortByNameDesc,
  SortByPriceAsc,
  SortByPriceDesc,
  SortByCapacityAsc,
  SortByCapacityDesc,
  SortByDiscountAsc,
  SortByDiscountDesc,
};
