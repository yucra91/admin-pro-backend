const mongoose = require('mongoose');

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // createIndexes: true,
};

const dbConnections = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, mongooseOptions);

        console.log('online DB');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD');
    }
}

module.exports = {
    dbConnections
}
