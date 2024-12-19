const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const controller = {};

// Récupérer tous les utilisateurs
controller.all = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Récupérer un utilisateur par ID
controller.id = async (req, res) => {
    try {
        const id = (req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "Invalid ID provided" });
        }

        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Pagination des utilisateurs
controller.index = async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const limit = parseInt(req.params.limite);

        if (page > 0 && limit > 0) {
            const users = await prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });

            const totalUsers = await prisma.user.count();

            res.json({ total: totalUsers, users });
        } else {
            res.status(400).json({ message: "Invalid pagination parameters" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching paginated users", error });
    }
};

// Recherche d'utilisateur par nom
controller.search = async (req, res) => {
    try {
        const name = req.query.name?.toLowerCase();

        if (!name || name === "") {
            return res.status(400).json({ message: "No name provided" });
        }

        const users = await prisma.user.findMany({
            where: {
                name: { contains: name, mode: "insensitive" },
            },
        });

        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ message: "No users found with this name" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error searching users", error });
    }
};

// Créer un utilisateur
controller.create = async (req, res) => {
    try {
        const name = req.body.name
        const age = parseInt(req.body.age)

        if (!name || name === "") {
            console.log(name)
            return res.status(400).json({ message: "Valid name are required" });
        }
        if (!age || age <= 0) {
            return res.status(400).json({ message: "Valid age are required" });
        }
        console.log("name : " + name)
        console.log("age : " + age)
        

        const newUser = await prisma.user.create({
            data: { name, age },
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Mettre à jour un utilisateur
controller.update = async (req, res) => {
    try {
        const id = req.params.id
        const name = req.body.name
        const age = parseInt(req.body.age)

        if (!name || name === "" || !age || age === "") {
            return res.status(400).json({ message: "Name and valid age are required" });
        }

        const user = await prisma.user.findUnique({ where: { id } });
        if (user) {
            const updatedUser = await prisma.user.update({
                where: { id },
                data: { name, age },
            })


            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Supprimer un utilisateur
controller.delete = async (req, res) => {
    console.log("test")
    
    try {
        
        const id = req.params.id
        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Invalid ID parameter" })
        }

        
        const user = await prisma.user.findUnique({ where: { id } })

        if (user) {
            await prisma.user.delete({ where: { id } })
            res.json({ message: "User deleted successfully" })
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        console.error("Error deleting user:", error)
        res.status(500).json({ message: "Error deleting user", error })
    }
};


module.exports = controller;
