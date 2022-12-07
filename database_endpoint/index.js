// Create service client module using ES6 syntax.
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
    const client = new DynamoDBClient({ region: "us-east-1" });

    const command = new ScanCommand();
    command.input = {
        TableName: "DeceasedEvents"
    };

    const data = await client.send(command);

    const response = {
        statusCode: 200,
        body: JSON.stringify(data.Items),
    };
    return response;
}