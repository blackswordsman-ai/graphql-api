const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString, 
  GraphQLUnionType   
 
} = require("graphql");

const Post =require("../models/Post")
const Video =require("../models/Video")
const PostType =require("../types/PostType");
const VideoType =require("../types/VideoType");

const CommentabelType = new GraphQLUnionType({
     name:"Commentable",
     types:[PostType, VideoType],
     resolveType:(value) => {
         if(value.url){
            return "Video";
         } 
         if (value.content){
            return "Post"
         }

         return null
     }
})


const CommentType = new GraphQLObjectType({
    name:"Comment",
    fields: () => ({
       id:{type:GraphQLID},
       content:{type:GraphQLString},
       commentabelId:{type:GraphQLID},
       commentabelType:{type:GraphQLString},
       commentabelData:{
        type:CommentabelType,
        resolve:async (parent) => {
           if(parent.commentabelType === "Post"){
            return await Post.findById(parent.commentabelId)
           }
           if(parent.commentabelType === "Video"){
            return await Video.findById(parent.commentabelId)
           }
           return null;
        }
       }
      
    })
    
})

module.exports = CommentType;