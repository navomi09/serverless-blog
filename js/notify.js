import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';

// Initialize SNS
AWS.config.update({
    region: 'us-east-1', // Replace with your AWS region
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', // Replace with your Identity Pool ID
    }),
});

const sns = new AWS.SNS();

// Subscribe user to notifications
export async function subscribeToNotifications(email) {
    try {
        const params = {
            Protocol: 'email', // You can also use 'sms' for phone numbers
            TopicArn: 'arn:aws:sns:us-east-1:123456789012:BlogUpdates', // Replace with your SNS topic ARN
            Endpoint: email,
        };
        await sns.subscribe(params).promise();
        return { success: true, message: 'You have been subscribed to notifications.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Send a notification
export async function sendNotification(subject, message) {
    try {
        const params = {
            Subject: subject,
            Message: message,
            TopicArn: 'arn:aws:sns:us-east-1:123456789012:BlogUpdates', // Replace with your SNS topic ARN
        };
        await sns.publish(params).promise();
        return { success: true, message: 'Notification sent successfully.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
