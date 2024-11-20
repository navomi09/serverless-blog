const awsConfig = {
    Auth: {
        region: 'ap-south-1', // Replace with your Cognito region
        userPoolId: 'ap-south-1_hQeMeiUzC', // Replace with your User Pool ID
        userPoolWebClientId: '6fj5on19m757atmpf8ksid3kdc', // Replace with your App Client ID
        mandatorySignIn: true, // If you want to enforce sign-in before using the app
    },
};

export default awsConfig;
