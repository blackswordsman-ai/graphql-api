const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,    
 
} = require("graphql");



const VideoType = new GraphQLObjectType({
    name:"Video",
    fields: () => ({
       id:{type:GraphQLID},
       title:{type:GraphQLString},
       url:{type:GraphQLString}
    })
    
})

module.exports = VideoType;