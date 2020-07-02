const express = require('express');
const Task = require('../model/Task');
const auth = require('../routes/auth')  ;
const router = express.Router();

  router.route('/')
  .get ( (req, res,next)=>{
      //res.send('testing');
     Task.find({owner: req.user.id})
     .then((task)=>{
        res.json(task);
      }).catch(next);
   
})
.post((req, res, next)=>{
    let {desc, done} =req.body;
    let owner = req.user.id;
   Task.create({desc,done,owner})
    //Task.create(req.body)
    .then((task)=>{
        res.status(201).json(task);
    }).catch(next);
})
.delete(auth.verifyAdmin,(req, res, next)=>{
Task.deleteMany() //{owner:req.user.id}
    .then((reply) => {
        res.json(reply);
    }).catch(next);
})
router.route('/:task_id')
.get((req,res,next)=>{
    Task.findById(req.params.task_id)
    .then(task=>{
        res.json(task);
    }).catch(next);
})



.put((req, res, next) => {
    Task.findByIdAndUpdate(req.params.task_id, { $set: req.body }, { new: true })
    .then((task) => {
        res.json(task);
    }).catch(next);
})
    
    .delete((req, res, next) => {
        Task.deleteOne({_id: req.params.task_id})//asynchro
            .then((reply) => {
             res.json(reply);
            }).catch(next);
    })
    router.route('/:task_id/notes')
     .get((req, res, next)=>{
         Task.findById(req.params.task_id)
         .then(task=>{
             res.json(task.notes);
         }).catch(next);
     })
     .post((req, res, next)=>{
         Task.findById(req.params.task_id)
         .then((task)=>{
             task.notes.push(req.body);
             task.save()
             .then((updatedTask)=>{
                res.json(updatedTask.notes);
            }).catch(next);
    }).catch(next);
           
     })
   
    
    .delete((req, res, next) => {
        Task.findById(req.params.task_id)
            .then((task) => {
                task.notes=[];
                task.save()
                    .then((updatedTask) => {
                        res.json(updatedTask.notes);
                    }).catch(next);
            }).catch(next);
    })

    router.route('/:task_id/notes/:note_id')
    .get((req, res, next) => {
        Task.findById(req.params.task_id)
        .then(task=>{
            res.json(task.notes.id(req.params.note_id));
     }).catch(next);
    })
    .put((req, res, next)=> {
        Task.findById(req.params.task_id)
        .then(task=>{
       let note = task.notes.id(req.params.note_id);
       note.text = req.body.text;
            task.save()
                    .then(updatedTask => {
                        res.json(task.notes.id(req.params.note_id));
                    }).catch(next);

                 }).catch(next);
    })
    .delete((req, res, next)=>{
        Task.findById(req.params.task_id)
        .then(task=>{
            task.notes = task.notes.filter((note)=>{
                return note.id !== req.params.note_id;
            })
            task.save()
            .then(updatedTask=>{
                res.json(task.notes);
            }).catch(next);

        }).catch(next);
    })
module.exports = router;













// app.post('/task',(req, res)=>{
    // Task.create(req.body)
    // .then((task)=>{
    //     res.status(201).json(task);
//     }).catch((err)=>console.log(err));
// });
// app.delete('/task',(req, res)=>{
    // Task.deleteMany() //{owner:req.user.id}
    // .then((reply) => {
    //     res.json(reply);
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
//     .get( (req, res, next) => {
//         Task.find()      //{owner: req.user.id})
//             .then((task) => {
//                 res.json(task);
//             }).catch(next);
//     })
//     .post((req, res, next) => {
//         // console.log(req.user.id);
//         // console.log(req.user);
//        // let {desc, done} =req.body;
//         //let owner = req.user.id;
//        // Task.create({desc,done,owner})
//          Task.create(req.body)
//             .then((task) => { // then vitrakotask its objects
//                 res.status(201).json(task);
//             }).catch(next);
//     })
//     .delete( (req, res, next) => {//auth.verifyAdmin,
//         Task.deleteMany() //{owner:req.user.id}
//             .then((reply) => {
//                 res.json(reply);
//             }).catch(next);
//     });
    //  router.route('/:task_id')
    // .get((req, res, next) => {
    //     Task.findById(req.params.task_id)
    //         .then((task) => {
    //             res.json(task);
    //         }).catch(next);
    // })
    // .put((req, res, next) => {
    //     Task.findByIdAndUpdate(req.params.task_id, { $set: req.body }, { new: true }) // update new thing dekhauu
    //         .then((task) => {
    //             res.json(task);
    //         }).catch(next);
    //     })
    //     .delete((req, res, next) => {
    //         Task.deleteOne({_id: req.params.task_id})//asynchro
    //             .then((reply) => {
    //              res.json(reply);
                        
    //             }).catch(next);
    //     })
    //      router.route('/:task_id/notes')
    //      .get((req, res, next)=>{
    //          Task.findById(req.params.task_id)
    //          .then(task=>{
    //              res.json(task.notes);
    //          }).catch(next);
    //      })
    //      .post((req, res, next)=>{
    //          Task.findById(req.params.task_id)
    //          .then((task)=>{
    //              task.notes.push(req.body);
    //              task.save()
    //              .then((updatedTask)=>{
    //                 res.json(updatedTask.notes);
    //             }).catch(next);
    //     }).catch(next);
               
    //      })
       
        
    //     .delete((req, res, next) => {
    //         Task.findById(req.params.task_id)
    //             .then((task) => {
    //                 task.notes=[];
    //                 task.save()
    //                     .then((updatedTask) => {
    //                         res.json(updatedTask.notes);
    //                     }).catch(next);
    //             }).catch(next);
    //     })

    //     router.route('/:task_id/notes/:note_id')
    //     .get((req, res, next) => {
    //         Task.findById(req.params.task_id)
    //         .then(task=>{
    //             res.json(task.notes.id(req.params.note_id));
    //      }).catch(next);
    //     })
    //     .put((req, res, next)=> {
    //         Task.findById(req.params.task_id)
    //         .then(task=>{
    //        let note = task.notes.id(req.params.note_id);
    //        note.text = req.body.text;
    //             task.save()
    //                     .then(updatedTask => {
    //                         res.json(task.notes.id(req.params.note_id));
    //                     }).catch(next);

    //                  }).catch(next);
    //     })
    //     .delete((req, res, next)=>{
    //         Task.findById(req.params.task_id)
    //         .then(task=>{
    //             task.notes = task.notes.filter((note)=>{
    //                 return note.id !== req.params.note_id;
    //             })
    //             task.save()
    //             .then(updatedTask=>{
    //                 res.json(task.notes);
    //             }).catch(next);

    //         }).catch(next);
    //     })
    
 