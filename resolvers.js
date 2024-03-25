const Post = require('./models/Post.model');
const Parent = require('./models/ParentModel');


const resolvers = {
    Query: {
        hello: () =>
        {
            return 'Hello World!';
        },

        getAllPosts: async () =>
        {
            return await Post.find();
        },
        getPost: async (parent, args, context, info) =>
        {
            return await Post.findById(args.id).exec()  // .exec() is used to return a promise;
        },

        // Parent Resolvers
        getAllParents: async () =>
        {
            return await Parent.find().exec();
        },
        getParent: async (parent, args, context, info) =>
        {
            return await Parent.findById(args.id).exec();
        }
    },

    Mutation: {
        createPost: async (parent, args, context, info) =>
        {
            const { title, description } = args.post;
            const post = new Post({ title, description });
            await post.save();
            return post;
            // return await Post.create(post);
        },
        deletePost: async (parent, args, context, info) =>
        {
            const post = await Post.findOneAndDelete({ _id: args.id }).exec();
            return 'Post deleted successfully!';
        },
        updatePost: async (parent, args, context, info) =>
        {
            const { title, description } = args.post;
            const post = await Post.findByIdAndUpdate(args.id, { title, description }, { new: true }).exec(); // { new: true } is used to return the updated document;
            return post;
        },

        // Parent Mutations
        createParent: async (parent, args, context, info) =>
        {
            const { parentName, contactInfo, alternateContact, relationshipToStudent } = args.parent;
            const parentValue = new Parent({ parentName, contactInfo, alternateContact, relationshipToStudent });
            await parentValue.save();
            return parentValue;
        },
        deleteParent: async (parent, args, context, info) =>
        {
            const parentValue = await Parent.findOneAndDelete({ _id: args.id }).exec();
            return 'Parent deleted successfully!';
        },
        updateParent: async (parent, args, context, info) =>
        {
            const { parentName, contactInfo, alternateContact, relationshipToStudent } = args.parent;
            const parentUpdate = {};

            const parentValue = await Parent.findByIdAndUpdate(args.id, { parentName, contactInfo, alternateContact, relationshipToStudent }, { new: true }).exec();
            return parentValue;
        }
    }
}
module.exports = resolvers;