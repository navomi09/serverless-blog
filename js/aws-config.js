import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'us-east-1', // Replace with your AWS region
        userPoolId: 'us-east-1_XXXXXXX', // Your Cognito User Pool ID
        userPoolWebClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXX', // Your Cognito App Client ID
        mandatorySignIn: true,
    },
    API: {
        endpoints: [
            {
                name: "BlogAPI",
                endpoint: "https://api-id.execute-api.us-east-1.amazonaws.com/prod", // Replace with your API Gateway endpoint
                region: "us-east-1", // Replace with your region
            },
        ],
    },
    Storage: {
        AWSS3: {
            bucket: "your-bucket-name", // Replace with your S3 bucket name
            region: "us-east-1", // Replace with your region
        },
    },
});
