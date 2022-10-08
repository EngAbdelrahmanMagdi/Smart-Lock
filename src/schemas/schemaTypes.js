const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");

const { GraphQLDateTime } = require("graphql-iso-date");

const UnitType = new GraphQLObjectType({
  name: "Unit",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    unit_name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const ReservationType = new GraphQLObjectType({
  name: "Reservation",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    unit_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    guest_name: { type: new GraphQLNonNull(GraphQLString) },
    check_in: { type: new GraphQLNonNull(GraphQLDateTime) },
    check_out: { type: new GraphQLNonNull(GraphQLDateTime) },
  }),
});

const LockType = new GraphQLObjectType({
  name: "Lock",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    unit_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    device_id: { type: new GraphQLNonNull(GraphQLString) },
    remote_lock_id: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const AccessCodeType = new GraphQLObjectType({
  name: "AccessCode",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    lock_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    reservation_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    access_code: { type: new GraphQLNonNull(GraphQLString) },
    passcode: { type: new GraphQLNonNull(GraphQLString) },
    access_code_id: { type: new GraphQLNonNull(GraphQLString) },
    remote_passcode_id: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = { UnitType, ReservationType, LockType, AccessCodeType };
