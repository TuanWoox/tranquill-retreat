import { FilterStrategy } from "./sortStrategies";

class FilterByAll extends FilterStrategy {
  filter(bookings) {
    return bookings;
  }
}

class FilerByConfirmed extends FilterStrategy {
  filter(bookings) {
    return bookings.filter((booking) => booking.status === "confirmed");
  }
}

class FilterByCheckedIn extends FilterStrategy {
  filter(bookings) {
    return bookings.filter((booking) => booking.status === "checked-in");
  }
}

class FilterByCheckedOut extends FilterStrategy {
  filter(bookings) {
    return bookings.filter((booking) => booking.status === "checked-out");
  }
}

export { FilerByConfirmed, FilterByCheckedIn, FilterByCheckedOut, FilterByAll };
