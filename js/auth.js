import { Auth } from 'aws-amplify';

// Register a new user (Sign Up)
export async function registerUser(email, password) {
    try {
        // Call Cognito to sign up the user
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                email: email,  // You can add other attributes like phone_number, given_name, etc.
            }
        });
        console.log('User signed up', user);
        return { success: true, message: 'Please confirm your email to complete registration.' };
    } catch (error) {
        console.error('Error during sign up', error);
        return { success: false, message: error.message };
    }
}

// Confirm registration with the code sent to the user's email
export async function confirmSignUpUser(email, code) {
    try {
        // Confirm the user with the confirmation code
        await Auth.confirmSignUp(email, code);
        console.log('User confirmed');
        return { success: true, message: 'Your account has been confirmed!' };
    } catch (error) {
        console.error('Error confirming sign up', error);
        return { success: false, message: error.message };
    }
}

// Sign in an existing user
export async function signInUser(email, password) {
    try {
        // Call Cognito to sign in the user
        const user = await Auth.signIn(email, password);
        console.log('User signed in', user);
        return { success: true, message: 'Sign-in successful!', user };
    } catch (error) {
        console.error('Error during sign in', error);
        return { success: false, message: error.message };
    }
}

// Sign out the current user
export async function signOutUser() {
    try {
        // Sign out the user from Cognito
        await Auth.signOut();
        console.log('User signed out');
        return { success: true, message: 'You have been signed out.' };
    } catch (error) {
        console.error('Error during sign out', error);
        return { success: false, message: error.message };
    }
}

// Change the password for a user
export async function changePassword(oldPassword, newPassword) {
    try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, oldPassword, newPassword);
        console.log('Password changed successfully');
        return { success: true, message: 'Password changed successfully!' };
    } catch (error) {
        console.error('Error changing password', error);
        return { success: false, message: error.message };
    }
}

// Forgot password (request to reset password)
export async function forgotPassword(email) {
    try {
        await Auth.forgotPassword(email);
        console.log('Password reset code sent');
        return { success: true, message: 'Password reset code sent to your email.' };
    } catch (error) {
        console.error('Error requesting password reset', error);
        return { success: false, message: error.message };
    }
}

// Reset password with the code sent to the user's email
export async function resetPassword(email, code, newPassword) {
    try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        console.log('Password reset successfully');
        return { success: true, message: 'Password has been reset successfully!' };
    } catch (error) {
        console.error('Error resetting password', error);
        return { success: false, message: error.message };
    }
}


