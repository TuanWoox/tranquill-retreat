import {
  SortByNameAsc,
  SortByNameDesc,
  SortByPriceAsc,
  SortByPriceDesc,
  SortByCapacityAsc,
  SortByCapacityDesc,
  SortByDiscountAsc,
  SortByDiscountDesc,
} from "../strategy/concreateStrategies";

class SortFactory {
  getSort(sortType) {
    switch (sortType) {
      case "nameAsc":
        return new SortByNameAsc();
      case "nameDesc":
        return new SortByNameDesc();
      case "priceAsc":
        return new SortByPriceAsc();
      case "priceDesc":
        return new SortByPriceDesc();
      case "capacityAsc":
        return new SortByCapacityAsc();
      case "capacityDesc":
        return new SortByCapacityDesc();
      case "discountAsc":
        return new SortByDiscountAsc();
      case "discountDesc":
        return new SortByDiscountDesc();
      default:
        throw new Error(`Unknown sort type: ${sortType}`);
    }
  }
}

export default SortFactory;
