
/**
 * Créez une fonction synchrone qui attend 2 seconde
 * 
 * utilisez new Promise
 */

const sleep = () => new Promise((resolve) => setTimeout(() => resolve(), 2000))

module.exports = { sleep };