const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} = require("graphql");
const BookPaginationType = require("../types/BookPaginationType");
const BookType = require("../types/BookType");
const AuthorType = require("../types/AuthorType");

const Book = require("../models/Book");
const Author = require("../models/Author");

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
      },
      resolve(parent, args) {
        const book = new Book({ title: args.title, authorId: args.authorId });
        return book.save();
      },
    },
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
    }
    }
});

// export schema

module.exports =new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});