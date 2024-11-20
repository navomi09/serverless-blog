import { Auth } from 'aws-amplify';

// Register a new user
export async function registerUser(email, password) {
    try {
        await Auth.signUp({
            username: email,
            password,
            attributes: { email }, // You can add more attributes if needed (like name)
        });
        return { success: true, message: 'Registration successful! Please verify your email.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Sign in an existing user
export async function signInUser(email, password) {
    try {
        const user = await Auth.signIn(email, password);
        return { success: true, message: 'Sign-in successful!', user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Sign out a user
export async function signOutUser() {
    try {
        await Auth.signOut();
        return { success: true, message: 'You have been signed out.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Check current session (to maintain session after sign-in)
export async function checkCurrentSession() {
    try {
        const session = await Auth.currentSession();
        return { success: true, session };
    } catch (error) {
        return { success: false, message: 'No session found.' };
    }
}

