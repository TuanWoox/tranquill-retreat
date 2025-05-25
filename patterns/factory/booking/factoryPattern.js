import {
  FilerByConfirmed,
  FilterByCheckedOut,
  FilterByCheckedIn,
  FilterByAll,
} from "../../strategy/booking/concreateStrategies";

class FilterFactory {
  getFilter(filterType) {
    switch (filterType) {
      case "confirmed":
        return new FilerByConfirmed(); // This also has a typo, see below
      case "checked-in":
        return new FilterByCheckedIn();
      case "checked-out":
        return new FilterByCheckedOut();
      case "all":
        return new FilterByAll();
      default:
        throw new Error(`Unknown filter type: ${filterType}`);
    }
  }
}

export default FilterFactory;
