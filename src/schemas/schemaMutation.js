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

const { GraphQLDateTime } = require("graphql-iso-date");

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
      },
      resolve: async (parent, args) => {
        try {
          const newReservation = await Database.query(
            "INSERT INTO reservations (unit_id, guest_name, check_in, check_out) VALUES($1,$2,$3,$4) RETURNING *",
            [args.unit_id, args.guest_name, args.check_in, args.check_out]
          );
          return newReservation.rows[0];
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
        device_id: { type: new GraphQLNonNull(GraphQLString) },
        remote_lock_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const newReservation = await Database.query(
            "INSERT INTO locks (unit_id, device_id, remote_lock_id) VALUES($1,$2,$3) RETURNING *",
            [args.unit_id, args.device_id, args.remote_lock_id]
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
        access_code: { type: new GraphQLNonNull(GraphQLString) },
        passcode: { type: new GraphQLNonNull(GraphQLString) },
        access_code_id: { type: new GraphQLNonNull(GraphQLString) },
        remote_passcode_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const newAccessCode = await Database.query(
            "INSERT INTO access_code (lock_id, reservation_id, access_code, passcode,access_code_id, remote_passcode_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            [
              args.lock_id,
              args.reservation_id,
              args.access_code,
              args.passcode,
              args.access_code_id,
              args.remote_passcode_id,
            ]
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
        remote_lock_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const updatedLocks = await Database.query(
            "UPDATE locks SET unit_id=$1, device_id=$2, remote_lock_id=$3 WHERE id=$4 RETURNING *",
            [args.unit_id, args.device_id, args.remote_lock_id, args.id]
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
        access_code: { type: new GraphQLNonNull(GraphQLString) },
        passcode: { type: new GraphQLNonNull(GraphQLString) },
        access_code_id: { type: new GraphQLNonNull(GraphQLString) },
        remote_passcode_id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const updateAccessCode = await Database.query(
            "UPDATE access_code SET lock_id=$1, reservation_id=$2, access_code=$3, passcode=$4, access_code_id=$5, remote_passcode_id=$6 WHERE id=$7 RETURNING *",
            [
              args.lock_id,
              args.reservation_id,
              args.access_code,
              args.passcode,
              args.access_code_id,
              args.remote_passcode_id,
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
