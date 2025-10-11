// impliment self referencing relationship
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList    
} = require("graphql");
const Book = require("../models/Book");
const Category = require("../models/Catgory")
// fetch the book using the category serach
const CategoryType = new GraphQLObjectType({
    name:"Category",
    fields: () => ({
      id:{type:GraphQLID},
      name:{type:GraphQLString},
      parentCategory:{
        type:CategoryType,
        resolve(parent){
        return parent.parentCategory?Category.findById( parent.parentCategory) : null;
        }
      },
      subCategories:{
       type: new GraphQLList(CategoryType),
       resolve(parent){
        return Category.find({parentCategory:parent.id})
       }
      }

        // const BookType =require("../types/BookType")
    //  return {
    //     id:{type: GraphQLID},
    //     name:{type: GraphQLString},

        // books:{
        //     type:new GraphQLList(BookType),
        //     async resolve(parent,args){
        //       return await Book.find({categoryId:parent.id})  
        //     }
        // }

    })
})

module.exports = CategoryType;