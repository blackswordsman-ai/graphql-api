require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema/schema');
const connectDB = require('./config/database');
const schema = require("./schema/index"); 

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ First connect to MongoDB
connectDB()
  .then(() => {
    // ✅ Only start server after DB connection is successful
    app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true
    }));

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  });
