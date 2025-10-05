const { name } = require("ejs");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const User = require("../models/User");

const users = [
  { id: "1", name: "John", age: 25 },
  { id: "2", name: "Jane", age: 30 },
];

// Query Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parents, args) {
        return users.find((user) => user.id === args.id);
      },
    },

    hello: {
      type: GraphQLString,
      resolve() {
        return "Hello World From Graphql";
      },
    },
    hi: {
      type: GraphQLString,
      resolve() {
        return "Hi World From Graphql";
      },
    },
  },
});

// Mutation Type


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser:{
            type: UserType,
            args:{
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent,args){
               const user ={
                id:users.length + 1 + "",
                name: args.name,
                age: args.age
               }
                users.push(user);
                console.log(users);
                return user;   
            }
        },
        
        updateUser:{
            type: UserType,
            args:{
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent,args){
               const user = users.find(u => u.id === args.id);
               if(user) {
                user.name = args.name || user.name;
                user.age = args.age || user.age;

                console.log(users);
                return user; 
               } 
                throw new Error("User not found");
               }
                
        },
        deleteUser:{
            type: UserType,
            args:{
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent,args){
               const index = users.findIndex(u => u.id === args.id);
                if(index === -1)  throw new Error("User not found");
                return users.splice(index,1)[0];
            
            }
                
        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
    mutation: Mutation
});
