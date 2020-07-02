const express = require('express');
const  mongoose  = require('mongoose');
require('dotenv').config();
const taskRouter= require('./routes/taskRouter');
const categoryRouter= require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const auth = require('./routes/auth');
const uploadRouter= require('./routes/uploadRouter')


const app = express();
mongoose.connect(
    //process.env.DBURI,
  ' mongodb://127.0.0.1:27017/mydatabase',
   {
      useNewUrlParser:true,
      useUnifiedTopology: true,
     useFindAndModify:true,
    useCreateIndex:true
   })
  .then(() => console.log('Database server connected'))
    .catch((err)=> console.log(err)) ;
  
      
  // body bata aayeko data put data or post data pathayoo vanne we need 2 middleware
      app.use(express.json());
      // clientlee pathayeko data  server ma data read garna ko lagii
   app.use(express.urlencoded({ extended: false }));
    //form bata aayeko data read garnako lagii expreess throudg middle ware// query parameter req.params.id client le pathayeko data server kasri read garne
  
  app.get('/',(req,res,)=>{
      res.send(' welcome to app');
  });
  app.use('/api/users',userRouter);
  app.use('/api/upload', uploadRouter);
  app.use('/api/tasks',auth.verifyUser,  taskRouter);
  app.use('/api/categories',categoryRouter);
  
  app.use((req,res,next)=>{
    let err = new Error('Not found');
    err.status =404;
    next(err);
  })
  app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
      status:'error',
      message:err.message
    });
  })

  app.listen(process.env.Port, () => {
    console.log(`Server is running at localhost:${process.env.Port}`);
  });























  
// For restful?
// app.get ('/task', (req, res)=>{
//     Task.find()
//     .then((task)=>{
//         res.json(task);
//     }).catch((err)=>console.log(err));
   
// });
// app.post('/task',(req, res)=>{
//     Task.create(req.body)
//     .then((task)=>{
//         res.status(201).json(task);
//     }).catch((err)=>console.log(err));
// });
// app.delete('/task',(req, res)=>{
//     Task.deleteMany() //{owner:req.user.id}
//     .then((reply) => {
//         res.json(reply);
//     }).catch((err)=>console.log(err));
// });
// app.get('/task/:id',(req, res ) => {
//     Task.findById(req.params.id)
//     .then((task)=>{
//         res.json(task);
//     }).catch((err)=>console.log(err));
// });
// app.put('/task/:id',(req, res ) => {
//     Task.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
//     .then((task)=>{
//         res.json(task);
//     }).catch((err)=>console.log(err));
// });

// app.delete('/task/:id',(req, res) => {
//     Task.deleteOne({_id: req.params.id})//asynchro
//         .then((reply) => {
//          res.json(reply);
                
//         }).catch((err)=>console.log(err));
// });


//     Task.findById(req.params.task_id)
//         .then((task) => {
//             res.json(task);
//         }).catch((err)=>console.log(err));
// })
// app.put('/task/:id',(req, res) => {
//     Task.findByIdAndUpdate(req.params.task_id, { $set: req.body }, { new: true }) // update new thing dekhauu
//         .then((task) => {
//             res.json(task);
//         }).catch((err)=>console.log(err));
//     })
    // app.delete('/task/:id',(req, res) => {
    //     Task.deleteOne({_id: req.params.task_id})//asynchro
    //         .then((reply) => {
    //          res.json(reply);
                    
    //         }).catch((err)=>console.log(err));
    // })

// app.listen(3000,()=>{
//     console.log(' Server is running at localhost:3000');
// });
  














// app.get('/task',(req, res)=>{
//     res.send('Send all books');
// });


// app.post('/task',(req, res)=>{
//     console.log(req.body.desc); // body bat post garna ko lagi exprees ma two functionality express json and url encoded
//     res.send(' should create a new  books');
// });
// app.put('/task',(req, res)=>{
//     res.send(' not found');
// });
// app.delete('/task',(req, res)=>{
//     res.send(' delete all books');
// });
// app.get('/task/:id',(req, res)=>{
//     res.send(`Send  a books  with id ${req.params.id}`);
// });
// app.post('/task/:id',(req, res)=>{
//     res.status(401).send(' Not allowed');
// });
// app.put('/task/:id',(req, res)=>{
//     res.send(`Update  the book  with id ${req.params.id}`);
// });
// app.delete('/task/:id',(req, res)=>{
//     res.send(`delete  a books  with id ${req.params.id}`);
// });

// app.get( (req, res) => {
//     Task.find()      //{owner: req.user.id})
//         .then((task) => {
//             res.json(task);
//         }).catch((err)=>console.log(err));
// })
// app.post((req, res, next) => {
//     // console.log(req.user.id);
//     // console.log(req.user);
//    // let {desc, done} =req.body;
//     //let owner = req.user.id;
//    // Task.create({desc,done,owner})
//      Task.create(req.body)
//         .then((task) => { // then vitrakotask its objects
//             res.status(201).json(task);
//         }).catch(next);
// })
// app.delete( (req, res, next) => {//auth.verifyAdmin,
    // Task.deleteMany() //{owner:req.user.id}
    //     .then((reply) => {
    //         res.json(reply);
//         }).catch(next);
// });
 
// app.get((req, res, next) => {
//     Task.findById(req.params.task_id)
//         .then((task) => {
//             res.json(task);
//         }).catch(next);
// })
// app.put((req, res, next) => {
//     Task.findByIdAndUpdate(req.params.task_id, { $set: req.body }, { new: true }) // update new thing dekhauu
//         .then((task) => {
//             res.json(task);
//         }).catch(next);
//     })
//     app.delete((req, res, next) => {
//         Task.deleteOne({_id: req.params.task_id})//asynchro
//             .then((reply) => {
//              res.json(reply);
                    
//             }).catch(next);
//     })
    
//     app.get((req, res, next)=>{
//          Task.findById(req.params.task_id)
//          .then(task=>{
//              res.json(task.notes);
//          }).catch(next);
//      })
//      app.post((req, res, next)=>{
//          Task.findById(req.params.task_id)
//          .then((task)=>{
//              task.notes.push(req.body);
//              task.save()
//              .then((updatedTask)=>{
//                 res.json(updatedTask.notes);
//             }).catch(next);
//     }).catch(next);
           
//      })
   
    
    //  app.delete((req, res, next) => {
    //     Task.findById(req.params.task_id)
    //         .then((task) => {
    //             task.notes=[];
    //             task.save()
    //                 .then((updatedTask) => {
    //                     res.json(updatedTask.notes);
    //                 }).catch(next);
    //         }).catch(next);
    // })
