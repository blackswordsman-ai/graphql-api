const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,    
} = require("graphql");
const Author = require("../models/Author");
const Category = require("../models/Catgory");



const BookType = new GraphQLObjectType({
    name:"Book",
    fields: () => {
  const AuthorType = require("../types/AuthorType");
  const CategoryType = require("./CategoryType");
     return {
        id:{type: GraphQLID},
        title:{type: GraphQLString},
        authorId:{type:GraphQLID},
        author:{
          type:AuthorType,
          resolve(parent){
           return Author.findById(parent.authorId)
          }
        },
        categories:{
          type: new GraphQLList(CategoryType),
          async resolve(parent, args){
            return Category.find({_id:{$in:parent.categoryId}})
          }
        }

        

    }}
})

module.exports = BookType;