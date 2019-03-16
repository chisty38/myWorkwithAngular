let express = require('express');
let router = express.Router();
let passport = require('passport');

let contactController = require('../controllers/contact');

function requireAuth (req, res, next) {
    //check to see if user has admin priviledge
    if(!req.isAuthenticated() || (req.user.username != "admin")) {
        return res.redirect('/login')
    }
    next();
}

/* Get contract List page - Read Operation */
router.get('/', requireAuth, contactController.displayContactList);
/* Get router for the add page*/

router.get('/add', requireAuth, contactController.displayAddPage);

/* Post route for processesing the add page */
router.post('/add',  requireAuth, contactController.processAddPage);

/* Get request - display the edit page */

router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* Post route for processesing the edit page */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

// get request to perform the delete action
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;