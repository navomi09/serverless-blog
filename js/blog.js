import { API } from 'aws-amplify';

// Fetch all blog posts
export async function getAllPosts() {
    try {
        const posts = await API.get("BlogAPI", "/posts");
        return { success: true, data: posts };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Create a new blog post
export async function createPost(title, content) {
    try {
        const post = {
            body: { title, content },
        };
        await API.post("BlogAPI", "/posts", post);
        return { success: true, message: 'Post created successfully!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Delete a blog post
export async function deletePost(postId) {
    try {
        await API.del("BlogAPI", `/posts/${postId}`);
        return { success: true, message: 'Post deleted successfully.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Add a comment to a blog post
export async function addComment(postId, comment) {
    try {
        const commentData = {
            body: { comment },
        };
        await API.post("BlogAPI", `/posts/${postId}/comments`, commentData);
        return { success: true, message: 'Comment added successfully!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Fetch comments for a blog post
export async function getComments(postId) {
    try {
        const comments = await API.get("BlogAPI", `/posts/${postId}/comments`);
        return { success: true, data: comments };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
