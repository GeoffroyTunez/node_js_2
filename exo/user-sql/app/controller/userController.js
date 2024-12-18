let {Users, maxId} = require("../model/Users")
const controller = {}

controller.index = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const data = Users.slice(((page - 1) * limit), page * limit)

  const result = {
    totalPages: Math.round(Users.length / limit),
    currentPage: page,
    limit: limit,
    links: {
      prev: `http://localhost:3000/users?page=${page - 1}&limit=${limit}`,
      current: `http://localhost:3000/users?page=${page}&limit=${limit}`,
      next: `http://localhost:3000/users?page=${page + 1}&limit=${limit}`
    },
    data
  }

  res.json(result)
}


controller.search = (req, res) => {
  const searchField = req.query.name
  const queryResult = Users.filter((u) => u.name.toLocaleLowerCase() === searchField.toLocaleLowerCase())
  res.json(queryResult)
}



controller.show = (req, res) => {
  const id = req.params.id
  const user = Users.find((u) => u.id == id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: "User not found !" })
  }
}


controller.create = async (req, res) => {
  const user = await Users.create(req.body)
  res.status(201).json(user)
}

controller.update = (req, res) => {
  const id = req.params.id
  const { name, age } = req.body

  if (!Users.find(u => u.id == id)) {
    return res.status(404).json({ message: "User not found !" })
  }

  Users.filter(u => u.id != id)
  Users.push({ name, age, id })
  res.json({ name, age, id })
}


controller.destroy = (req, res) => {
  const id = req.params.id

  const toDel = User.find((u) => u.id == id)

  if (toDel) {
    Users = Users.filter((u) => u.id != id)
    res.json(toDel)
  } else {
    res.status(404).json({ message: "User not found !" })
  }
}

module.exports = controller