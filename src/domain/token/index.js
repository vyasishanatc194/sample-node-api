const TokenSerializer = [
  {
    name: "Email",
    maxLength: 30,
    minLength: 10,
    type: "string",
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    required: true,
  },
  {
    name: "Password",
    maxLength: 15,
    minLength: 8,
    type: "string",
    required: true,
  }
];

module.exports = {
  TokenSerializer
}