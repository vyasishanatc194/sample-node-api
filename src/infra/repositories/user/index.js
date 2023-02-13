const { comparePassword } = require('../../encryption')

module.exports = ({ model }) => {
  const getAll = (...args) =>
    model.findAll(...args).then((entity) => (entity)
    )

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => (dataValues))

  const update = (...args) =>
    model.update(...args)
      .catch((error) => { throw new Error(error) })

  const findById = (...args) =>
    model.findByPk(...args)
      .then(({ dataValues }) => (dataValues))
      .catch((error) => { throw new Error(error) })

  const findOne = (...args) =>
    model.findOne(...args)
      .then(({ dataValues }) => (dataValues))
      .catch((error) => { throw new Error(error) })

  const validatePassword = (endcodedPassword) => (Password) =>
    comparePassword(Password, endcodedPassword)

  const destroy = (...args) =>
    model.destroy(...args)

  return {
    getAll,
    create,
    update,
    findById,
    findOne,
    validatePassword,
    destroy
  }
}

