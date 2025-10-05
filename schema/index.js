const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

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
            type:new GraphQLList(BookType),
        resolve(parent,args){
            return Book.find()
        }
    }
    }
});

// export schema

module.exports =new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});