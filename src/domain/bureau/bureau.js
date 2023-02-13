const BureuCreateSerializer = [
  {
    name: "Email",
    maxLength: 50,
    minLength: 10,
    type: "string",
    required: true,
  },
  {
    name: "LegalName",
    maxLength: 10,
    minLength: 6,
    type: "string",
    required: true,
  },
  {
    name: "PrimaryContact",
    maxLength: 20,
    minLength: 10,
    type: "string"
  },
  {
    name: "PrimaryContactPhoneNumber",
    maxLength: 20,
    minLength: 10,
    type: "string"
  },
  {
    name: "PrimaryContactMobileNumber",
    maxLength: 20,
    minLength: 10,
    type: "string"
  },
  {
    name: "Address",
    maxLength: 50,
    minLength: 10,
    type: "string",
  },
  {
    name: "City",
    maxLength: 20,
    minLength: 5,
    type: "string"
  },
  {
    name: "State",
    maxLength: 20,
    minLength: 5,
    type: "string"
  },
  {
    name: "Country",
    maxLength: 20,
    minLength: 1,
    type: "string"
  },
  {
    name: "Zip",
    maxLength: 20,
    minLength: 5,
    type: "string"
  },
  {
    name: "SampleFile",
    maxLength: 300,
    minLength: 10,
    type: "object"
  },
];

const BureuStatusChangeSerializer = [
  {
    name: "Status",
    maxLength: 10,
    minLength: 6,
    type: {
      PENDING: "Pending",
      ACTIVE: "Active"
    },
    required: true,
  }
];

module.exports = {
  BureuCreateSerializer,
  BureuStatusChangeSerializer
}