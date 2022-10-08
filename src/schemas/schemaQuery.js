const Database = require("../database.js");
const {
  UnitType,
  LockType,
  ReservationType,
  AccessCodeType,
} = require("./schemaTypes");
const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    unit: {
      type: UnitType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        try {
          const returnedUnit = await Database.query(
            "SELECT * FROM units WHERE id =$1",
            [args.id]
          );
          // console.log(returnedUnit);
          return returnedUnit.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },
    units: {
      type: new GraphQLList(UnitType),
      resolve: async (parent, args) => {
        try {
          const returnedUnits = await Database.query("SELECT * FROM units");
          return returnedUnits.rows;
        } catch (error) {
          return error.message;
        }
      },
    },

    reservation: {
      type: ReservationType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        try {
          const returnedReservation = await Database.query(
            "SELECT * FROM reservations WHERE id =$1",
            [args.id]
          );
          // console.log(returnedReservation);
          return returnedReservation.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },
    reservations: {
      type: new GraphQLList(ReservationType),
      resolve: async (parent, args) => {
        try {
          const returnedReservations = await Database.query(
            "SELECT * FROM reservations"
          );
          return returnedReservations.rows;
        } catch (error) {
          return error.message;
        }
      },
    },

    lock: {
      type: LockType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        try {
          const returnedLock = await Database.query(
            "SELECT * FROM locks WHERE id =$1",
            [args.id]
          );
          // console.log(returnedLock);
          return returnedLock.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },
    locks: {
      type: new GraphQLList(LockType),
      resolve: async (parent, args) => {
        try {
          const returnedLocks = await Database.query("SELECT * FROM locks");
          return returnedLocks.rows;
        } catch (error) {
          return error.message;
        }
      },
    },

    accessCode: {
      type: AccessCodeType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        try {
          const returnedAccessCode = await Database.query(
            "SELECT * FROM access_code WHERE id =$1",
            [args.id]
          );
          // console.log(returnedAccessCode);
          return returnedAccessCode.rows[0];
        } catch (error) {
          return error.message;
        }
      },
    },
    accessCodes: {
      type: new GraphQLList(AccessCodeType),
      resolve: async (parent, args) => {
        try {
          const returnedAccessCodes = await Database.query(
            "SELECT * FROM access_code"
          );
          return returnedAccessCodes.rows;
        } catch (error) {
          return error.message;
        }
      },
    },
  },
});

module.exports = RootQuery;
