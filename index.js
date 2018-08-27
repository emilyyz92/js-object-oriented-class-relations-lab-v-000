const store = {drivers: [], passengers: [], trips:[]};
let driverId = 0;
let passengerId = 0;
let tripId = 0;

class Driver {
  constructor(name) {
    this.name = name;
    store.drivers.push(this);
    this.id = driverId++;
  }

  trips() {
    const tripFilter = function () {
      const driver = this
      return store.trips.filter(trip => function (){
        return trip.driverId === driver.id
      })
    }
    return tripFilter.call(this)
  }

  passengers() {
    const passengerFilter = function () {
      const driver = this
      return store.passengers.filter(trip => function (){
        return trip.passengerId === driver.id
      })
    }
    return passengerFilter.call(this)
  }

}

class Passenger {
  constructor(name) {
    this.name = name;
    store.passengers.push(this);
    this.id = passengerId++;
  }

  trips() {
    return store.trips.filter(trip => {
      return trip.passengerId === this.id
    })
  }

  drivers() {
    return this.trips().map(function(trip) {
      return trip.driver()
    })
  }
}

class Trip {
  constructor(driver, passenger) {
    this.passengerId = passenger.id;
    this.driverId = driver.id;
    store.trips.push(this);
    this.id = tripId++;
  }

  passenger() {
    return store.passengers.filter(
      passenger => function () {
        return this.passengerId === passenger.id
      }
    )[0]
  }

  driver() {
    return store.drivers.filter(
      driver => function () {
        return this.driverId === driver.id
      }
    )[0]
  }

}
