const Post = require('./models/Post.model');

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
            return await Post.findById(args.id);
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
            const post = await Post.findOneAndDelete({ _id: args.id });
            return 'Post deleted successfully!';
        },
        updatePost: async (parent, args, context, info) =>
        {
            const { title, description } = args.post;
            const post = await Post.findByIdAndUpdate(args.id, { title, description }, { new: true });
            return post;
        }
    }
}
module.exports = resolvers;