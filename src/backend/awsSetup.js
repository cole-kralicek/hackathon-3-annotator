const axios = require('axios')
const dotenv = require('dotenv')
const fs = require('fs');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { callOpenRouter } = require("./llmSummary")


const accesskey = process.env.ACCESS_KEY;
const secretkey = process.env.SECRETACCESS_KEY;
const region = process.env.REGION;
const bucket = process.env.S3_BUCKET_NAME;




const client = new S3Client({ 
    region: region,
    credentials:{
        accessKeyId: accesskey,
        secretAccessKey: secretkey,
    }

})


exports.handler = async () => {
    try {
        const filepa = path.join(__dirname, "test.txt")
        const fileContent = fs.readFileSync(filepa,'utf-8');

        const contentType = 'text/plain'; // Adjust based on actual content
        const fileName = `${uuidv4()}.txt`; // Generate a unique file name

        // Specify S3 bucket and key
        const s3Key = `${fileName}`; // Path to store the file in S3

        // Upload the file to S3
        const params = {
            Bucket: bucket,
            Key: s3Key,
            Body: fileContent,
            ContentType: contentType
        };

        

        await client.send(new PutObjectCommand(params));
        const summary = callOpenRouter(fileContent);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'File uploaded successfully',
                fileContent: fileContent, // Actual file content
                summary: summary // The summary of the connent
            }),
        };
        } catch (error) {
            console.error('Error uploading file:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error uploading file', error: error.message }),
            };
        
    }
};


