class Serializer {
  /**
   * Validates the object type
   *
   * @param {object} type - The type of object to be validated
   * @param {any} value - The value to be validated against the type
   * @returns {boolean} - True if the value is of the specified type, otherwise False
   */

  objectValidate(type, value) {
    return type.length
      ? true
      : Object.values(type).includes(value)
        ? true
        : false;
  }

  /**
   * Validates a single field value against the field's specified validation rules
   *
   * @param {object} field - The field object containing the validation rules
   * @param {any} value - The value to be validated
   * @returns {boolean} - True if the value is valid, otherwise throws an error
   */

  async validate(field, value) {
    if (value === null) {
      throw new Error(`Value for ${field.name} should not be null`);
    }
    if (
      field.type &&
      (typeof field.type == "object"
        ? !this.objectValidate(field.type, value)
        : typeof value !== field.type)
    ) {
      throw new Error(
        `${field.name} should be of type: ${typeof field.type == "object" ? Object.values(field.type) : field.type
        }`
      );
    }
    if (field.regex && typeof value === "string" && !value.match(field.regex)) {
      throw new Error(`${field.name} value does not match the regex pattern: ${field.regex}`);
    }
    if (
      field.hasOwnProperty("minLength") &&
      (typeof value === "string" ? value.length : value) < field.minLength
    ) {
      throw new Error(
        `Minimum length of ${field.name} should be greater than ${field.minLength}`
      );
    }
    if (
      field.hasOwnProperty("maxLength") &&
      (typeof value === "string" ? value.length : value) > field.maxLength
    ) {
      throw new Error(
        `Maximum length of ${field.name} should be less than ${field.maxLength}`
      );
    }

    return true;
  }

  /**
   * Serializes the input data object into a new object with only the specified fields
   *
   * @param {object} data - The input data object to be serialized
   * @param {Array<object>} fields - The fields to include in the serialized data
   * @returns {object} - The serialized data object
   */

  async serialize(data, fields) {
    const serializedData = {};
    for (const field of fields) {
      if (!data.hasOwnProperty(field.name)) {
        if (field.required) {
          throw new Error(`Missing required field: ${field.name}`);
        }
        continue;
      }
      await this.validate(field, data[field.name]);
      serializedData[field.name] = data[field.name];
    }
    return serializedData;
  }
}

// example  for implimentation
// async function callSerialize() {
//   const serializer = new Serializer();

//   try {
//     const fields = [
//       {
//         name: "Name",
//         maxLength: 100,
//         minLength: 5,
//         type: "string",
//         required: false,
//       },
//       {
//         name: "Email",
//         maxLength: 30,
//         minLength: 10,
//         type: "string",
//         regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
//         required: true,
//       },
//       {
//         name: "Password",
//         maxLength: 15,
//         minLength: 10,
//         type: "string",
//         required: true,
//       },
//       {
//         name: "Age",
//         maxLength: 100,
//         minLength: 10,
//         type: "number",
//         regex: String,
//         required: false,
//       },
//       {
//         name: "Type",
//         maxLength: 10,
//         minLength: 3,
//         type: Object.freeze({
//           RED: "red",
//           GREEN: "green",
//           BLUE: "blue",
//         }),
//         required: true,
//       },
//       {
//         name: "List",
//         maxLength: 10,
//         minLength: 3,
//         type: ["tusdghar", "ravu", "jkfjk"],
//         required: true,
//       },
//       {
//         name: "IsActive",
//         type: "boolean",
//         required: true,
//       },
//     ];

//     const data = {
//       Name: "John_Doe",
//       Email: "qt99dfsdffsdfsfs54@gmail.com",
//       Password: "secret12354",
//       Age: 10,
//       IsActive: true,
//       Type: "green",
//       List: [1, 2, 3, 4, 5, "JJJJJJJJJJJJJJJJJ"],
//     };

//     const serializedData = await serializer.serialize(data, fields);
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// callSerialize();

module.exports = Serializer;
