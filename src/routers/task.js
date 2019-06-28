const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')


router.post('/task', auth,async (req, res) => {

    // const task = new Task(req.body)
    const task  = new Task ({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/task',auth,  async (req,res) => {

    try{
        const match = {}
        const sort = {}

        if(req.query.sortBy)
        {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1:1
        }
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        await req.user.populate({
            path: 'task',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        console.log(req.user)
        res.send(req.user.task)
        // const task = await Task.find({owner: req.user._id})
        // res.send(task)
    }catch(e){
        res.status(500).send()
    }
})
router.get('/task/:id', auth, async (req,res) => {
    const _id = req.params.id

    try{
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task ) return res.status(404).send()

        res.send(task)
    }catch(e) {
        res.status(500).send()
    }
})



router.delete('/task/:id', auth, async (req,res) => {

    try{

        const task = Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task) return res.status(404).send()

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})


router.patch('/task/:id', auth, async (req, res) => {
    const update = Object.keys (req, body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    if(!isValid) return res.status(400).send(error, "Not VALID fields for task update")

    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id })
        // const task = await Task.findByIdAndUpdate(req.params.id)
      

        if(!task) return res.status(400).send()
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }catch(e) {
        res.status(400).send(e)
    }
})
module.exports = router