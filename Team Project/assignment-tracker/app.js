const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://rajan233:rajan233@sukhwinder.ntnvfpp.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Load Assignment Model
require('./models/assignment');
const Assignment = mongoose.model('assignment');

// Handlebars Middleware
const handlebars = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(require('handlebars')),
    helpers: {
        eq: function(arg1, arg2, options) {
            return arg1 == arg2 ? options.fn(this) : options.inverse(this);
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
    // Fetch all assignments from the database
    Assignment.find({})
        .then(assignments => {
            res.render('index', { assignments: assignments });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/assignment/add', (req, res) => {
    res.render('add'); });

// Assuming you have already defined your route handler for rendering the dashboard view
app.get('/dashboard', async (req, res) => {
    try {
        // Calculate the counts of assignments in each category
        const totalAssignments = await Assignment.countDocuments({});
        const completedAssignments = await Assignment.countDocuments({ status: 'Completed' });
        const upcomingAssignments = await Assignment.countDocuments({ dueDate: { $gt: new Date() } });
        const overdueAssignments = await Assignment.countDocuments({ dueDate: { $lt: new Date() } });

        // Render the dashboard view and pass the counts as variables
        res.render('dashboard', {
            totalAssignments: totalAssignments,
            completedAssignments: completedAssignments,
            upcomingAssignments: upcomingAssignments,
            overdueAssignments: overdueAssignments
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

// Process Form Route
app.post('/assignment', (req, res) => {
    const newAssignment = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        category: req.body.category 
    };

    // Save the new assignment to the database
    new Assignment(newAssignment)
        .save()
        .then(assignment => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Delete Assignment Route
app.delete('/assignment/:id', (req, res) => {
    // Remove the assignment from the database based on its ID
    Assignment.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/'); // Redirect to the home page after deleting the assignment
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Update Assignment Form Route
app.get('/assignment/:id/edit', (req, res) => {
    // Fetch the assignment from the database based on its ID
    Assignment.findById(req.params.id)
        .then(assignment => {
            if (!assignment) {
                res.status(404).send('Assignment not found');
            } else {
                res.render('edit', { assignment: assignment });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

// Process Update Form Route
app.put('/assignment/:id', (req, res) => {
    // Update the assignment in the database based on its ID
    Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(assignment => {
            if (!assignment) {
                res.status(404).send('Assignment not found');
            } else {
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
