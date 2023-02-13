/**
  * function for getter bureau.
  */
const Sequelize = require("sequelize");
const container = require('src/container')
const users = container.resolve('database').models.users

module.exports = ({ bureauRepository, config }) => {
  // code for getting all the items
  const all = (req) => {
    const limit = parseInt(req.query.PageSize) || config.PageSize
    const offset = parseInt(req.query.PageNumber) || 0
    let queryParameters = {
      limit,
      offset,
      where: {
        IsActive: 1
      },
      include: [{
        model: users,
        attributes: [
          'ID', 'Email', 'LegalName', 'IsActive', 'createdAt', 'updatedAt'],
      }],
      attributes: [
        'ID', 'PrimaryContact', 'UserID', 'PrimaryContactPhoneNumber', 'PrimaryContactMobile', 'Address', 'City', 'State', 'Country', 'Zip', 'Status', 'isActive', 'CreatedAt', 'UpdatedAt'
      ],
    }
    const SortBy = req.query.SortBy || null
    const OderBy = req.query.OderBy || null
    const Search = req.query.Search || null
    if (SortBy && OderBy) {
      queryParameters.order = [
        [{ model: users, as: 'user' }, SortBy, OderBy]
      ]
    }
    // TODO not working the search functionality
    if (Search) {
      queryParameters.include.where = {
        LegalName: { [Sequelize.Op.like]: `%${Search}%` }
      }
    }

    return Promise
      .resolve()
      .then(() => {
        let data = bureauRepository.getAll(queryParameters)
        return data
      }
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
