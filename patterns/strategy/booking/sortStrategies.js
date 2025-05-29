// SortStrategies.js

// Strategy Interface
class FilterStrategy {
  filter(bookings) {
    throw new Error("sort() must be implemented.");
  }
}

// Context
class BookingFilter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  filter(bookings) {
    return this.strategy.filter(bookings);
  }
}

export { FilterStrategy, BookingFilter };
