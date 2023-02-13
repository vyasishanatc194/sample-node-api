const t = require('tcomb')
const userTypes = t.enums({
  ADMIN: 'ADMIN',
  BUREAU: 'BUREAU'
});

const UserForgotPassowordSerializer = [
  {
    name: "Email",
    maxLength: 30,
    minLength: 10,
    type: "string",
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    required: true,
  }
];


const UserResetPasswordSerializer = [
  {
    name: "Token",
    maxLength: 300,
    minLength: 200,
    type: "string",
    required: true,
  },
  {
    name: "NewPassword",
    maxLength: 10,
    minLength: 6,
    type: "string",
    required: true,
  }
];

const UserChangePasswordSerializer = [
  {
    name: "OldPassword",
    maxLength: 10,
    minLength: 6,
    type: "string",
    required: true,
  },
  {
    name: "NewPassword",
    maxLength: 10,
    minLength: 6,
    type: "string",
    required: true,
  }
];
module.exports = {
  UserForgotPassowordSerializer,
  UserResetPasswordSerializer,
  UserChangePasswordSerializer
}
