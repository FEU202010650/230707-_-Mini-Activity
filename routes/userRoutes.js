/*const express = require('express');
const router = express.Router();
const userController = require("../controllers/userControllers")

router.post('/checkEmail', (req, res) => {
	userController.checkEmailExists(req.body)
	.then(result => res.end(result.toString()))
	;
})

module.exports = router;*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')


router.post('/checkEmail', (req, res) =>{
	userController.checkEmailExists(req.body)
	.then(resultfromController => res.send(resultfromController)) 
});

// route for user registration
router.post('/register', (req, res) => {
	userController.registerUser(req.body)
	.then(resultfromController => res.send(resultfromController))
});

// route for user authentication
router.post('/login', (req, res) => {
	userController.loginUser(req.body)
	.then(resultfromController => res.send(resultfromController));
}) 

// route for retrieving user details
router.post('/details', (req, res) => {
	// provide the user's ID for the getProfile controller method
	userController.getProfile({ userId: req.body.id })
	.then(resultfromController => res.send(resultfromController));
})


module.exports = router;