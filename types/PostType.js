const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,    
 
} = require("graphql");



const PostType = new GraphQLObjectType({
    name:"Post",
    fields: () => ({
       id:{type:GraphQLID},
       title:{type:GraphQLString},
       content:{type:GraphQLString}
    })
    
})

module.exports = PostType;