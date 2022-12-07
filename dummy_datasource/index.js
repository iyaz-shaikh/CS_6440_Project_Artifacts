const { faker } = require('@faker-js/faker');

exports.handler = async (_) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(randomizedPatient()),
    };
    return response;
};


const randomizedPatient = () => {
    return {
        resourceType: "Patient",
        id: "example" + faker.datatype.uuid(),
        name: [ {
          use: "official",
          family: faker.name.lastName(),
          given: [ faker.name.firstName(), faker.name.middleName() ]
        }, {
          use: "usual",
          given: [ faker.name.firstName() ]
        } ],
        telecom: [ {
          system: "phone",
          value: faker.phone.number(),
          use: "home"
        } ],
        gender: "Male",
        birthDate: faker.date.birthdate(),
        deceased: true
      }
}