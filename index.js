'use strict';
const express = require('express');
const {sequelize} = require("./models");//models index export db dòng cuối => sequelize này chính là connect của mình tới database
const { logger } = require('./src/middleware/logger');

const path = require("path");//copy cùng __dirname -> require mọi thứ trên đầu

const rootRouter = require('./src/routers'); 
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./src/graphql/schema');
const graphqlResolvers = require('./src/graphql/resolvers');

const app = express();
app.use(express.json());//destructuring -> undefined -> phải dùng express.json

//ko muốn log khi get hình lên => copy từ web
app.use("/public", express.static(path.join(__dirname, "public")));

///log tất cả những request gửi rới server của mình
app.use(logger);

// app.use("/graphql", graphqlHTTP({
//     schema: graphqlSchema,
//     rootValue: graphqlResolvers,
//     graphiql: true, //giúp debug ở môi trg developer, ở mt production: false
// })); //graphqlHTTP: confict sẵn express với graphql lại vs nhau, như 1 handler  
app.use('/api',rootRouter);//tất cả api đều đi qua đường dẫn này mới vào rootRouter => p2: router của mìh (import vô)

//check test connection
sequelize
.authenticate()
.then(()=>{
    console.log("connection has been establised successfully");
})
.catch((err)=>{
    console.error("unable to connect to the database:", err);
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`app litening on port ${port}`);
});