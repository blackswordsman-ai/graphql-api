const { name } = require("ejs");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLNonNull
} = require("graphql");
const User = require("../models/User");

const users = [
  { id: "1", name: "John", age: 25 },
  { id: "2", name: "Jane", age: 30 },
];

const UserInputType = new GraphQLInputObjectType({
    name: "UserInput",
    fields: {
        name:{type: new GraphQLNonNull(GraphQLString)},
        age:{type: new GraphQLNonNull(GraphQLInt)}
    }
});

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
   users:{
      type: new GraphQLList(UserType),
      resolve(parents, args) {
        return User.find();

      }
   },

    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parents, args) {
        return User.findById(args.id);
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
               input: { type: UserInputType }
            },
            async resolve(_,{input}){

                if(!input.name || input.name.length < 3){
                    throw new Error("Name Must be at least 3 characters long");
                }
              const user = new User({
                name: input.name,
                age:input.age
               }) 
               return await user.save(); 

            }
        },
        
        updateUser:{
            type: UserType,
            args:{
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            async resolve(parent,args){

                return await User.findByIdAndUpdate(
                     args.id,
                    {name: args.name, age: args.age},
                    {new: true}
                )
            }
                
        },
        deleteUser:{
            type: UserType,
            args:{
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            async resolve(parent,args){
             
           return await User.findByIdAndDelete(
                args.id,
            )

            }
                
        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
    mutation: Mutation
});
