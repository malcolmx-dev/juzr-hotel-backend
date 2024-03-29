const {updateAdmin} = require('../controllers/admin')
const {verifyToken, verifyUser, verifyAdmin} = require('../utils/verifyToken')


//UPDATE
route.put('/:id',verifyAdmin, updateAdmin)