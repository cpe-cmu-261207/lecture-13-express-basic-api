import express, { Request } from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({
	extended: true
}));

type Task = {
	id: number,
	name: string
	complete: boolean
}

const tasks: Task[] = [
	{ id: 1, name: 'Have breakfast', complete: false },
	{ id: 2, name: 'Take a shower', complete: true },
]

let currentId: number = 3

app.get('/', (req, res) => {
	return res.json({ message: 'success' })
})

app.get('/todo', (req, res) => {
	return res.json({ status: 'success', tasks: tasks })
})

app.post('/todo/add', (req: Request<{}, {}, Task>, res) => {
	const newTask: Task = {
		id: currentId,
		name: req.body.name,
		complete: req.body.complete
	}
	tasks.push(newTask)
	currentId += 1

	return res.json({ status: 'success', tasks: tasks })
})

app.put('/todo/mark', (req, res) => {

	const markingTask = tasks.find(x => x.id === req.body.id)
	if (markingTask) {
		markingTask.complete = req.body.complete
		return res.json({ status: 'success', task: markingTask })
	} else {
		return res.status(404).json({
			status: 'failed',
			message: 'Id is not found'
		})
	}
})

app.get('/me', (req, res) => {
	return res.json({
		name: 'Chayanin Suatap',
		code: '610631100'
	})
})

app.delete('/todo/delete/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const foundIndex = tasks.findIndex(x => x.id === id)
	if (foundIndex > -1){
		tasks.splice(foundIndex, 1)
		return res.json({status: 'success', tasks}) 
	}
	else{
		return res.status(404).json({
			status: 'failed',
			message: 'Id is not found'
		})
	}
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Server is running at port ${port}`)
})