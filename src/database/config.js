const mongoose = require('mongoose');
require('colors');

const dbConnection = async() => {
    try {
        
        await mongoose.connect( process.env.MONGODB_CNN);

        console.log('Base de datos online'.green);

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos'.green);
    }
}

module.exports = {
    dbConnection
}