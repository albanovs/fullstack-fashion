import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://albvnovs:wsxokn890@cluster0.tovrrlk.mongodb.net/?retryWrites=true&w=majority')
        console.log('Подключение к базе данных успешно');
    } catch (error) {
        console.error('Ошибка подключения к базе данных', error);
    }
};

export default connectDB;