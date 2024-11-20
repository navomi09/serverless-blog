import { Auth } from 'aws-amplify';

// Sign up a new user
export async function registerUser(email, password) {
    try {
        await Auth.signUp({
            username: email,
            password,
            attributes: { email },
        });
        return { success: true, message: 'Registration successful! Please verify your email.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Confirm user email (if required)
export async function confirmUser(email, code) {
    try {
        await Auth.confirmSignUp(email, code);
        return { success: true, message: 'Email confirmed successfully!' };
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

// Forgot password: Send reset code
export async function forgotPassword(email) {
    try {
        await Auth.forgotPassword(email);
        return { success: true, message: 'Password reset code sent. Check your email.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Forgot password: Reset password
export async function resetPassword(email, code, newPassword) {
    try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        return { success: true, message: 'Password reset successful!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
