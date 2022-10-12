const express = require("express");
require("dotenv").config();

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schemaMutation");
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use((req, res, next) => {
  res.status(404).send("Page Not Found!");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err + "" });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
