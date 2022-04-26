const {UserModel} = require('../models/User')

 const save = async function (userObj) {
    try {
      const user = new UserModel(userObj)
      const response = await user.save()
      return response
    } catch (e) {
      return e.toString()
    }
  
  }
  
  const find = async function (userObj) {
    try {
      const response = await UserModel.findOne(userObj)
      return response
    } catch (e) {
      return e.toString()
    }
  }
  
  module.exports = { save, find }