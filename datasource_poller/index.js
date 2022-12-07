const axios = require('axios');
const { KinesisClient, PutRecordCommand } = require("@aws-sdk/client-kinesis");

exports.handler = async(event) => {
  const data = await getFHIRData();
  await processFHIRData(data);

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };

  return response;
};

const getFHIRData = async (client) => {
  const url = "https://aaekoispwj.execute-api.us-east-1.amazonaws.com/default/FHIR_Dummy_DataSource";
  const {data} = await axios.get(url);
  return data;
};

const processFHIRData = async (record) => {
  const client = new KinesisClient({ region: "us-east-1" });

  const command = new PutRecordCommand();
  command.input = {
    Data: Buffer.from(JSON.stringify(record)),
    PartitionKey: "anyOldKey",
    StreamName: "DeceasedProducer"
  };
  
  console.log(command.input.Data.toString());
  // async/await.
  const data = await client.send(command);
}