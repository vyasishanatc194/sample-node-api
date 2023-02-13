module.exports = ({ model }) => {
  const getAll = (...args) =>
    model.findAll(...args).then((entity) => (entity)
    )

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
    destroy
  }
}
