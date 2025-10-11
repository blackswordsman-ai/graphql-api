const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const BookPaginationType = require("../types/BookPaginationType");
const BookType = require("../types/BookType");
const AuthorType = require("../types/AuthorType");
const CategoryType = require("../types/CategoryType");

const Book = require("../models/Book");
const Author = require("../models/Author");
const Category = require("../models/Catgory");

// manipulate data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        const author = new Author({ name: args.name });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        authorId: { type: GraphQLID },
        categoryId:{type: new GraphQLList(GraphQLID)},
      },
      resolve(parent, args) {
        const book = new Book({ title: args.title, authorId: args.authorId,categoryId:args.categoryId });

        return book.save();
      },
    },
    addCategory: {
       type:CategoryType,
       args:{
         name:{type: new GraphQLNonNull(GraphQLString)},
         parentCategory:{type: GraphQLID}
       },
       resolve(parent, args){
          const category = new Category({
            name:args.name,
            parentCategory:args.parentCategory || null 
            
          })
          return category.save()
         
       }
    }
  },
});


// query to get data

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        authors:{
            type:new GraphQLList(AuthorType),

        resolve(parent,args){
           return Author.find()
        }},
        books:{
            type:BookPaginationType,
            args:{
              page:{type:GraphQLInt},
              authorId:{type:GraphQLID}
            },

       async resolve(parent,args){
          const limit = 2;
          const page = args.page || 1;
          const offset= (page- 1)* limit ;

          const filter = {};
          if(args.authorId) filter.authorId() = args.authorId;

          const totalCount = await Book.countDocuments(filter);
          const totalPages = Math.ceil(totalCount/ limit);
             const books = await  Book.find(filter).skip(offset).limit(limit)

             return {
              books,
              totalPages,
              currentPage:page,
              hasNextPage:page < totalPages ? "true" : "false",
              hasPreviousPage:page > 1 ? "true" : "false"
             }
        }
              },
        categories:{
          type:new GraphQLList( CategoryType),
          args:{
            id:{type:GraphQLID}
          },
          resolve(parent, args){
              return Category.find()
          }
        }  ,
        category:{
          type:CategoryType,
          args:{id:{type:GraphQLID}},
          resolve(parent, args){
            return Category.findById(args.id);
          }
        }


    }
});

// export schema

module.exports =new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});