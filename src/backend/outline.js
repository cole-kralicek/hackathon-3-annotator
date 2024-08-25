const { handler } = require('./awsSetup'); // Path to your Lambda function file
console.log('Region:', process.env.REGION);
console.log('S3 Bucket Name:', process.env.S3_BUCKET_NAME);

const event = {}; // Provide any necessary event data here if needed

handler(event).then(response => {
    console.log('Lambda response:', response);
}).catch(error => {
    console.error('Lambda error:', error);
});
