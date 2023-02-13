const { toEntity } = require('./transform')

module.exports = ({ model }) => {
  const getAll = (...args) =>
    model.findAll(...args).then((entity) => (entity)
    )

  const findById = (...args) =>
    model.findByPk(...args)
      .then(({ dataValues }) => (dataValues))
      .catch((error) => { throw new Error(error) })

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => (dataValues))

  const update = (...args) =>
    model.update(...args)

  const destroy = (...args) =>
    model.destroy(...args)

  return {
    getAll,
    create,
    update,
    destroy,
    findById
  }
}
