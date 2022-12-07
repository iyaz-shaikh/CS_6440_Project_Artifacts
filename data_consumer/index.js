// Create service client module using ES6 syntax.
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
    const records = event.Records;
    const client = new DynamoDBClient({ region: "us-east-1" });


    for (const record of records) {
        const command = new PutItemCommand();
        console.log(record.kinesis.data);
        const data = JSON.parse(record.kinesis.data.toString());
        
        command.input = {};
        command.input.TableName = "DeceasedEvents";

        command.input.Item = {
            patientId: {
                "S" : data.id,
            },
            id: {
                "S" : data.id,
            },
            firstName: {
                "S": data.name[0].given[0]
            },
            middleName: {
                "S": data.name[0].given[1]
            },
            lastName: {
                "S": data.name[0].family
            },
            nickname: {
                "S": data.name[1].given[0]
            },
            phoneNumber: {
                "S": data.telecom[0].value
            },
            gender: {
                "S": data.gender
            },
            birthDate: {
                "S": data.birthDate
            },
            deceased: {
                "BOOL": data.deceased
            }
        };

        await client.send(command);
    }


    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
