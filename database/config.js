const mongoose = require('mongoose');

const Url ='mongodb+srv://mean_user:AqQ00oYd0Iw4pI2P@cluster0.vcewzo2.mongodb.net/hospital';

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
