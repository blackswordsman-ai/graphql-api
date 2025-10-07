const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList  ,  
  GraphQLInt
} = require("graphql");
const Author = require("../models/Author")


const BookPaginationType = new GraphQLObjectType({
    name:"BookPagination",
    fields: () => {
        const BookType = require("../types/BookType")
        return {
            books:{type: new GraphQLList(BookType) },
            totalPages:{type: GraphQLInt},
            currentPage:{type: GraphQLInt},
            hasNextPage:{type:GraphQLString},
            hasPreviousPage:{type:GraphQLString}
        }
  }
})

module.exports = BookPaginationType;