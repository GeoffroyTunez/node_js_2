const myMiddleware = (req, res, next) => {
    console.log('Middleware actif');
    setTimeout(() => {
        next(); 
    }, 5); 
};


const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        "message": "Route non trouvée",
        "status": "error"
    });
};

module.exports = { myMiddleware, notFoundMiddleware };
