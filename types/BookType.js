const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,    
} = require("graphql");
const Author = require("../models/Author")


const BookType = new GraphQLObjectType({
    name:"Book",
    fields: () => {
  const AuthorType = require("../types/AuthorType");
     return {
        id:{type: GraphQLID},
        title:{type: GraphQLString},
        authorId:{type:GraphQLID},
        author:{
          type:AuthorType,
          resolve(parent){
           return Author.findById(parent.authorId)
          }
        }

        

    }}
})

module.exports = BookType;