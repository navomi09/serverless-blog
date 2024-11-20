// Configuration for AWS Amplify
import Amplify, { Auth, API } from 'aws-amplify';
import awsconfig from './aws-exports'; // Replace with your actual AWS config file
Amplify.configure(awsconfig);

const apiName = 'blogAPI'; // Replace with your API Gateway name
const blogPath = '/blogs'; // Blog API endpoint
const commentPath = '/comments'; // Comment API endpoint

// DOM Elements
const blogContainer = document.getElementById('blog-posts');
const commentForm = document.getElementById('comment-form');
const commentsContainer = document.getElementById('comments');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Utility: Display error messages
function displayError(message) {
    alert(`Error: ${message}`);
}

// User Authentication: Sign up
async function registerUser(email, password) {
    try {
        await Auth.signUp({
            username: email,
            password: password,
            attributes: { email },
        });
        alert('Registration successful! Please verify your email.');
    } catch (error) {
        displayError(error.message);
    }
}

// User Authentication: Sign in
async function signInUser(email, password) {
    try {
        await Auth.signIn(email, password);
        alert('Sign-in successful!');
    } catch (error) {
        displayError(error.message);
    }
}

// Fetch all blog posts
async function fetchBlogs() {
    try {
        const blogs = await API.get(apiName, blogPath);
        blogContainer.innerHTML = '';
        blogs.forEach(blog => {
            const blogElement = document.createElement('div');
            blogElement.className = 'blog-post';
            blogElement.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
                <button onclick="deleteBlog('${blog.id}')">Delete</button>
            `;
            blogContainer.appendChild(blogElement);
        });
    } catch (error) {
        displayError(error.message);
    }
}

// Create a new blog post
async function createBlog(title, content) {
    try {
        const blog = { title, content };
        await API.post(apiName, blogPath, { body: blog });
        alert('Blog created successfully!');
        fetchBlogs();
    } catch (error) {
        displayError(error.message);
    }
}

// Delete a blog post
async function deleteBlog(blogId) {
    try {
        await API.del(apiName, `${blogPath}/${blogId}`);
        alert('Blog deleted successfully!');
        fetchBlogs();
    } catch (error) {
        displayError(error.message);
    }
}

// Fetch comments for a blog
async function fetchComments(blogId) {
    try {
        const comments = await API.get(apiName, `${commentPath}/${blogId}`);
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <p>${comment.text}</p>
                <button onclick="deleteComment('${comment.id}')">Delete</button>
            `;
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        displayError(error.message);
    }
}

// Add a comment to a blog
async function addComment(blogId, text) {
    try {
        const comment = { blogId, text };
        await API.post(apiName, commentPath, { body: comment });
        alert('Comment added successfully!');
        fetchComments(blogId);
    } catch (error) {
        displayError(error.message);
    }
}

// Delete a comment
async function deleteComment(commentId) {
    try {
        await API.del(apiName, `${commentPath}/${commentId}`);
        alert('Comment deleted successfully!');
    } catch (error) {
        displayError(error.message);
    }
}

// Event Listeners
document.getElementById('register-btn').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    registerUser(email, password);
});

document.getElementById('signin-btn').addEventListener('click', () => {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    signInUser(email, password);
});

commentForm.addEventListener('submit', event => {
    event.preventDefault();
    const blogId = document.getElementById('blog-id').value;
    const text = document.getElementById('comment').value;
    addComment(blogId, text);
});

// Load Blogs on Page Load
fetchBlogs();
