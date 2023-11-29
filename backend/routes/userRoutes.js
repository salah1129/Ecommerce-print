// User routes
const express= require ('express');
const router= express.Router();
const {createUser, loginUser, getUsers, getUser, searchUsers, updateUser, deleteUser} = require("../contollers/usersController");

//Add a new user:
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/search', searchUsers)
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;