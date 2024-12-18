const nameIsPresent = (req, res, next) => {

  const { name } = req.body
  if (!name || typeof name != 'string' || name == '') {
    return res.status(400).json({ message: "Le nom doit être présent" })
  }

  next()
}

const ageIsPresentAndPositive = (req, res, next) => {
  const { age } = req.body
  if (!age || !Number.isInteger(age) || age < 0) {
    return res.status(400).json({ message: "L'âge doit être présent et positif" })
  }

  next()
}


module.exports = { nameIsPresent,  ageIsPresentAndPositive }