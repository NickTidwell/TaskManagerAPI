const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true

})




// const me = new user({
//     name: 'Nick',
//     age: 20,
//     password: "Nickooooooo"
// })

// const nTask = new task({
//     description: 'Clean Up',
//     completed: false
// })

// nTask.save().then((task)=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })

// me.save().then((me)=>{
//     console.log(me)
// }).catch((error) =>{
//     console.log(error)
// })

