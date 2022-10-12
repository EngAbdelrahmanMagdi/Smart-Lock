const Database = require("../database.js");
const RootQuery = require("./schemaQuery");
const {
  getLock,
  getReservation,
  getUnit,
  getUnitInLocks,
} = require("./functions.js");
const {
  UnitType,
  LockType,
  ReservationType,
  AccessCodeType,
} = require("./schemaTypes");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const { accessCode, passcode } = require("./../functions/passcode");
const { GraphQLDateTime } = require("graphql-iso-date");

require("dotenv").config();
const { DEVICE_ID } = process.env;
var device = DEVICE_ID;
var remote_passcode_id = "";

(async function () {
  remote_passcode_id = await accessCode();
})();

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUnit: {
      type: UnitType,
      args: {
        unit_name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const newUnit = await Database.query(
            "INSERT INTO units (unit_name) VALUES($1) RETURNING *",
            [args.unit_name]
          );
          return newUnit.rows[0];
        } catch (error) {
          return error;
        }
      },
    },
    deleteUnit: {
      type: UnitType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const todo = await Database.query("SELECT * FROM units WHERE id=$1", [
            args.id,
          ]);
          const deletedUnit = await Database.query(
            "DELETE FROM units WHERE id=$1",
            [args.id]
          );
          // console.log(todo.rows[0])
          return todo.rows[0];
        } catch (error) {
          return error;
        }
      },
    },
    addReservation: {
      type: ReservationType,
      args: {
        unit_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (reservation) => getUnit(reservation.id),
        },
        guest_name: { type: new GraphQLNonNull(GraphQLString) },
        check_in: { type: new GraphQLNonNull(GraphQLDateTime) },
        check_out: { type: new GraphQLNonNull(GraphQLDateTime) },
        lock_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (accessCode) => getLock(accessCode.id),
        },
      },
      resolve: async (parent, args) => {
        try {
          const newReservation = await Database.query(
            "INSERT INTO reservations (unit_id, guest_name, check_in, check_out) VALUES($1,$2,$3,$4) RETURNING *",
            [args.unit_id, args.guest_name, args.check_in, args.check_out]
          );
          const reservationID = await Database.query(
            "SELECT id FROM reservations ORDER BY reservations.id DESC LIMIT 1"
          );
          const test = {...reservationID}; 
          const IdOfReservation = test.rows[0].id;
          const newAccessCode = await Database.query(
            "INSERT INTO access_code (lock_id, reservation_id, passcode, remote_passcode_id) VALUES($1,$2,$3,$4) RETURNING *",
            [args.lock_id, IdOfReservation, passcode, remote_passcode_id]
          );
          return newAccessCode.rows[0];
        } catch (error) {
          return error;
        }
      },
    },
    deleteReservation: {
      type: ReservationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const todo = await Database.query(
            "SELECT * FROM reservations WHERE id=$1",
            [args.id]
          );
          const deletedReservation = await Database.query(
            "DELETE FROM reservations WHERE id=$1",
            [args.id]
          );
          const deletedAccessKey = await Database.query(
            "DELETE FROM access_code WHERE access_code.reservation_id=$1",
            [args.id]
          );
          // console.log(todo.rows[0])
          return todo.rows[0];
        } catch (error) {
          return error;
        }
      },
    },
    addLock: {
      type: LockType,
      args: {
        unit_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (lock) => getUnitInLocks(lock.id),
        },
      },
      resolve: async (parent, args) => {
        try {
          const newReservation = await Database.query(
            "INSERT INTO locks (unit_id, device_id) VALUES($1,$2) RETURNING *",
            [args.unit_id, device]
          );
          return newReservation.rows[0];
        } catch (error) {
          return error;
        }
      },
    },
    deleteLock: {
      type: LockType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const todo = await Database.query("SELECT * FROM locks WHERE id=$1", [
            args.id,
          ]);
          const deletedReservation = await Database.query(
            "DELETE FROM locks WHERE id=$1",
            [args.id]
          );
          // console.log(todo.rows[0])
          return todo.rows[0];
        } catch (error) {
          return error;
        }
      },
    },

    addAccessCode: {
      type: AccessCodeType,
      args: {
        lock_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (accessCode) => getLock(accessCode.id),
        },
        reservation_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (accessCode) => getReservation(accessCode.id),
        },
      },
      resolve: async (parent, args) => {
        try {
          const newAccessCode = await Database.query(
            "INSERT INTO access_code (lock_id, reservation_id, passcode, remote_passcode_id) VALUES($1,$2,$3,$4) RETURNING *",
            [args.lock_id, args.reservation_id, passcode, remote_passcode_id]
          );
          return newAccessCode.rows[0];
        } catch (error) {
          return error;
        }
      },
    },
    deleteAccessCode: {
      type: AccessCodeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const todo = await Database.query(
            "SELECT * FROM access_code WHERE id=$1",
            [args.id]
          );
          const deletedAccessCode = await Database.query(
            "DELETE FROM access_code WHERE id=$1",
            [args.id]
          );
          // console.log(todo.rows[0])
          return todo.rows[0];
        } catch (error) {
          return error;
        }
      },
    },

    updateUnit: {
      type: UnitType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        unit_name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const updatedUnit = await Database.query(
            "UPDATE units SET unit_name=$1 WHERE id=$2 RETURNING *",
            [args.unit_name, args.id]
          );
          console.log(updatedUnit);
          return updatedUnit.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },

    updateReservation: {
      type: ReservationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        unit_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (reservation) => getUnit(reservation.id),
        },
        guest_name: { type: new GraphQLNonNull(GraphQLString) },
        check_in: { type: new GraphQLNonNull(GraphQLDateTime) },
        check_out: { type: new GraphQLNonNull(GraphQLDateTime) },
        is_cancelled: { type: new GraphQLNonNull(GraphQLBoolean) },
        lock_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (accessCode) => getLock(accessCode.id),
        },
      },
      resolve: async (parent, args) => {
        try {
          const updatedReservation = await Database.query(
            "UPDATE reservations SET unit_id=$1, guest_name=$2, check_in=$3, check_out=$4, is_cancelled=$5 WHERE id=$6 RETURNING *",
            [
              args.unit_id,
              args.guest_name,
              args.check_in,
              args.check_out,
              args.is_cancelled,
              args.id,
            ]
          );
          const deletedAccessKey = await Database.query(
            "DELETE FROM access_code WHERE access_code.reservation_id=$1",
            [args.id]
          );
          const newAccessCode = await Database.query(
            "INSERT INTO access_code (lock_id, reservation_id, passcode, remote_passcode_id) VALUES($1,$2,$3,$4) RETURNING *",
            [args.lock_id, args.id, passcode, remote_passcode_id]
          );
          console.log(updatedReservation);
          return updatedReservation.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },

    cancelReservation: {
      type: ReservationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        unit_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (reservation) => getUnit(reservation.id),
        },
        guest_name: { type: new GraphQLNonNull(GraphQLString) },
        check_in: { type: new GraphQLNonNull(GraphQLDateTime) },
        check_out: { type: new GraphQLNonNull(GraphQLDateTime) },
      },
      resolve: async (parent, args) => {
        try {
          const updatedReservation = await Database.query(
            "UPDATE reservations SET unit_id=$1, guest_name=$2, check_in=$3, check_out=$4, is_cancelled=$5 WHERE id=$6 RETURNING *",
            [
              args.unit_id,
              args.guest_name,
              args.check_in,
              args.check_out,
              true,
              args.id,
            ]
          );
          const deletedAccessKey = await Database.query(
            "DELETE FROM access_code WHERE access_code.reservation_id=$1",
            [args.id]
          );
          console.log(updatedReservation);
          return updatedReservation.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },

    updateLock: {
      type: LockType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        unit_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (lock) => getUnitInLocks(lock.id),
        },
        device_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const updatedLocks = await Database.query(
            "UPDATE locks SET unit_id=$1, device_id=$2 WHERE id=$3 RETURNING *",
            [args.unit_id, args.device_id, args.id]
          );
          console.log(updatedLocks);
          return updatedLocks.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },

    updateAccessCode: {
      type: AccessCodeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        lock_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (accessCode) => getLock(accessCode.id),
        },
        reservation_id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve: (accessCode) => getReservation(accessCode.id),
        },
      },
      resolve: async (parent, args) => {
        try {
          const updateAccessCode = await Database.query(
            "UPDATE access_code SET lock_id=$1, reservation_id=$2, passcode=$3, remote_passcode_id=$4 WHERE id=$5 RETURNING *",
            [
              args.lock_id,
              args.reservation_id,
              passcode,
              remote_passcode_id,
              args.id,
            ]
          );
          console.log(updateAccessCode);
          return updateAccessCode.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
