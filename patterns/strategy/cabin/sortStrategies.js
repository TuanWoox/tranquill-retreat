// SortStrategies.js

// Strategy Interface
class SortStrategy {
  sort(cabins) {
    throw new Error("sort() must be implemented.");
  }
}

// Context
class CabinSorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(cabins) {
    return this.strategy.sort(cabins);
  }
}

export { SortStrategy, CabinSorter };
