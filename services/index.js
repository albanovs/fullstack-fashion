import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import token from 'jsonwebtoken'

const db = mongoose
    .connect('mongodb+srv://albvnovs:wsxokn890@cluster0.tovrrlk.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB okey'))
    .catch((err) => console.log('DB error', err));

console.log(db)

const app = express();
app.use(express.json());
app.use(cors());
const Jwt = token

const User = mongoose.model('login', new mongoose.Schema({
    username: String,
    password: String,
}))

app.post('/test/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Проверяем, есть ли уже пользователь с таким именем
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }
        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем нового пользователя
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(200).json({ message: 'Регистрация прошла успешно' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
});

app.post('/test/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Проверяем, существует ли пользователь с таким именем
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Неправильное имя пользователя или пароль' });
        }

        // Проверяем правильность пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неправильное имя пользователя или пароль' });
        }
        // Создаем и подписываем JWT-токен
        const token = Jwt.sign({ userId: user._id }, 'secret_key');

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
});

const MyModel = mongoose.model('mymodels', new mongoose.Schema({
    account: String,
    num: Number,
    monako: String,
    fenix: String,
    lider: String,
    turan: String
}))


// Telegram ---------------------------------------------------------------------------------------------

const MyModelForTg = mongoose.model('telegramSlot', new mongoose.Schema({
    account: String,
    num: Number,
    monako: String,
    fenix: String,
    lider: String,
    turan: String
}))

app.post('/test/telegramSlot', async (req, res) => {
    try {
        const { account, num } = req.body;
        const myData = new MyModelForTg({ account, num });
        await myData.save()
        res.status(200).json({ massage: 'Данные успешно добавлены' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Что-то пошло не так' });
    }
})

app.patch('/test/telegramSlot/:id', async (req, res) => {
    const { id } = req.params;
    const { monako, lider, fenix, turan } = req.body;

    try {
        const updatedTelegram = await MyModelForTg.findByIdAndUpdate(
            id,
            { monako, lider, fenix, turan },
            { new: true }
        );
        res.json(updatedTelegram);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/slot/telegram', async (req, res) => {
    try {
        for (var i = 1; i <= 10; i++) {
            const myData = new MyModelForTg({
                'account': req.body.account,
                'num': i,
                'monako': '',
                'fenix': '',
                'lider': '',
                'turan': '',
            });
            await myData.save()
        }
        res.status(200).json({ massage: `${JSON.stringify(myData)}` });

    } catch (error) {
        res.status(500).json({ error: 'что то пошло не так!' });
    }
});

app.get('/test/telegramSlot', async (req, res) => {
    try {
        const data = await MyModelForTg.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Что то пошло не так'
        })
    }
})

// ---------------------------------------------------------------------------------------------------

// INSTAGRAM -------------------------------------------------------------------------------------------

app.post('/test/mymodels', async (req, res) => {
    try {
        const { account, num } = req.body;
        const myData = new MyModel({ account, num });
        await myData.save();
        res.status(200).json({ message: 'Данные успешно добавлены' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Что-то пошло не так' });
    }
});


app.patch('/test/mymodels/:id', async (req, res) => {
    const { id } = req.params;
    const { monako, lider, fenix, turan } = req.body;

    try {
        const updatedMyModel = await MyModel.findByIdAndUpdate(
            id,
            { monako, lider, fenix, turan },
            { new: true }
        );
        res.json(updatedMyModel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/insert/account', async (req, res) => {
    try {
        for (var i = 1; i <= 5; i++) {
            const myData = new MyModel({
                'account': req.body.account,
                'num': i,
                'monako': '',
                'fenix': '',
                'lider': '',
                'turan': '',
            });
            await myData.save()
        }
        res.status(200).json({ massage: `${JSON.stringify(myData)}` });

    } catch (error) {
        res.status(500).json({ error: 'что то пошло не так!' });
    }
});

app.get('/test/mymodels', async (req, res) => {
    try {
        const data = await MyModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Что то пошло не так'
        })
    }
})

//------------------------------------------------------------------------------------------------------

// WHATSAPP ---------------------------------------------------------------------------------------

const MyModelForWA = mongoose.model('whatsappSlot', new mongoose.Schema({
    account: String,
    num: Number,
    monako: String,
    fenix: String,
    lider: String,
    turan: String
}))

app.post('/test/whatsappSlot', async (req, res) => {
    try {
        const { account, num } = req.body;
        const myData = new MyModelForWA({ account, num });
        await myData.save()
        res.status(200).json({ massage: 'Данные успешно добавлены' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Что-то пошло не так' });
    }
})

app.patch('/test/whatsappSlot/:id', async (req, res) => {
    const { id } = req.params;
    const { monako, lider, fenix, turan } = req.body;

    try {
        const updatedWhatsapp = await MyModelForWA.findByIdAndUpdate(
            id,
            { monako, lider, fenix, turan },
            { new: true }
        );
        res.json(updatedWhatsapp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/slot/whatsapp', async (req, res) => {
    try {
        for (var i = 1; i <= 20; i++) {
            const myData = new MyModelForWA({
                'account': req.body.account,
                'num': i,
                'monako': '',
                'fenix': '',
                'lider': '',
                'turan': '',
            });
            await myData.save()
        }
        res.status(200).json({ massage: `${JSON.stringify(myData)}` });

    } catch (error) {
        res.status(500).json({ error: 'что то пошло не так!' });
    }
});

app.get('/test/whatsappSlot', async (req, res) => {
    try {
        const data = await MyModelForWA.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Что то пошло не так'
        })
    }
})

//-------------------------------------------------------------------------------------------------

app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
