const express = require('express');
const router = express.Router();
const Category = require('../model/Category')
//const Task = require('../model/Task');
//  const auth = require('../auth');



router.route('/')
.get((req, res, next)=>{
    Category.find()
    .then(categories=>{
        res.json(categories);
    }).catch(next);
})
.post((req, res, next)=>{ // if no verifyuser taken authentication din6 if verfiy no authentication
    Category.create(req.body)
    .then(category=>{
        res.status(201).json(category); // new item created
    }).catch(next);
})
.delete((req, res, next)=>{
    Category.deleteMany()
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})
router.route('/:category_id')
.get((req, res, next)=>{
    Category.findById(req.params.category_id)
    .then(category=>{
        res.json(category);
    }).catch(next);

})
.put((req, res, next)=>{
    Category.findByIdAndUpdate(req.params.category_id, {$set: req.body}, {new:true})
    .then(updatedCategory =>{
        res.json(updatedCategory);
    }).catch(next);
})
    .delete((req, res, next)=>{
        Category.deleteOne({ _id: req.params.category_id})
        .then(reply=>{
            res.json(reply);
        }).catch(next);
    })

    router.route('/:category_id/tasks')
    .get((req, res, next) =>{
    Category.findById(req.params.category_id)
    .populate('tasks')
    .then(category =>{
        res.json(category.tasks);
    }).catch(next);
    })
    .post((req, res, next) =>{
      Category.findById(req.params.category_id)
      .then(category=>{
          Task.create(req.body)
          .then(task=>{
              category.tasks.push(task._id);
              category.save()
              .then(updatedCategory =>{
                res.status(201).json(updatedCategory.tasks);  
              }).catch(next);
          }).catch(next);

      }).catch(next);
    })
    .delete((req, res, next) =>{
        Category.findById(req.params.category_id)
    // Category.findByIdAndDelete(req.params.category_id)
      .then(category =>{
    Task.deleteMany({_id: {$in: category.tasks}})
    .then(reply =>{
        category.tasks =[];
        category.save()
        .then(updatedCategory =>{
            res.json({reply, updatedCategory});
        }).catch(next);
    }).catch(next);
        }).catch(next);
    })
    router.route('/:category_id/tasks/:task_id')
    .get((req, res, next) =>{
        Category.findById(req.params.category_id)
        .then(category =>{
            if(category.tasks.includes(req.params.task_id)){
                Task.findById(req.params.task_id)
                .then(task =>{
                    res.json(task);
                }).catch(next);
            }else{
                let err = new Error(' task not found!');
                err.status(404);
                next(err);
            }
            }).catch(next);
        })

        

    .put((req, res, next) =>{
        Category.findById(req.params.category_id)
        .then(category =>{
            if(category.tasks.includes(req.params.task_id)){
                Task.findByIdAndUpdate(req.params.task_id, {$set: req.body}, {new: true})
                .then(task=>{
                    res.json(task); 
                }).catch(next);
            }else{
                throw new Error(' not found1');
            }
        })
        .catch(next);
    })
    .delete((req, res, next) =>{
        Category.findById(req.params.category_id)
        .then(category =>{
if (category.tasks.includes(req.params.task_id)){
    category.tasks = category.tasks.filter((task_id)=>{
        return task_id !== req.params.task_id;
    });
    Task.deleteOne({_id: req.params.task_id})
    .then(reply =>{
        
        category.save()
        .then(updatedCategory =>{
            res.json({reply, updatedCategory});
        }).catch(next);
    }).catch(next);
}else{
    throw new Error(' not found');
}
        }).catch(next);

    })

module.exports = router;

























// .delete((req, res, next) =>{
//     Category.findById(req.params.category_id)
//     .then(category =>{
// if (category.tasks.includes(req.params.category_id)){
// Task.deleteOne({_id: req.params.task_id})
// .then(reply =>{
//     category.tasks = category.tasks.filter((value)=>{
//         return value !== req.params.task_id;
//     })
//     category.save()
//     .then(updatedCategory =>{
//         res.json({reply, updatedCategory});
//     }).catch(next);
// }).catch(next);
// }else{
// throw new Error(' not found1');
// }
//     }).catch(next);

// })