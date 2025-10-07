const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList    
} = require("graphql");
const Book = require("../models/Book");

// fetch the book using the category serach
const CategoryType = new GraphQLObjectType({
    name:"Category",
    fields: () => {
        const BookType =require("../types/BookType")
     return {
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        books:{
            type:new GraphQLList(BookType),
            async resolve(parent,args){
              return await Book.find({categoryId:parent.id})  
            }
        }

    }}
})

module.exports = CategoryType;