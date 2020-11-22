//importamos mongoose
const mongoose = require('mongoose');

//conectamos bd con nuestra api a través de mongoose
mongoose.connect('mongodb+srv://new_user_333:backend202006@cluster0.7lbyp.mongodb.net/ecommercedb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => console.log("Successfully conected to MongoDB"))
.catch(console.error)

