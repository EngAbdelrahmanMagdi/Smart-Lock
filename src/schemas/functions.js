const Database = require("../database.js");

async function getUnit(id) {
  try {
    const unit = await Database.any(
      "SELECT * FROM units WHERE units.id = (SELECT unit_id FROM reservations WHERE reservations.id = $1)",
      [id]
    );
    console.log(unit);
    return unit;
  } catch (error) {
    console.log(error);
  }
}

async function getUnitInLocks(id) {
  try {
    const unit = await Database.any(
      "SELECT * FROM units WHERE units.id = (SELECT unit_id FROM locks WHERE locks.id = $1)",
      [id]
    );
    console.log(unit);
    return unit;
  } catch (error) {
    console.log(error);
  }
}

async function getLock(id) {
  try {
    const lock = await Database.any(
      "SELECT * FROM locks WHERE locks.id = (SELECT lock_id FROM access_code WHERE access_code.id = $1)",
      [id]
    );
    console.log(lock);
    return lock;
  } catch (error) {
    console.log(error);
  }
}

async function getReservation(id) {
  try {
    const reservation = await Database.any(
      "SELECT * FROM reservations WHERE reservations.id = (SELECT reservation_id FROM access_code WHERE access_code.id = $1)",
      [id]
    );
    console.log(reservation);
    return reservation;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getLock, getReservation, getUnit, getUnitInLocks };
