var router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const auth = require('../middlewares/auth');

router.route('/')
    .get(auth, async(req, res) => {
        try {
            if(req.user){
                return res.redirect('/dashboard');
            }
            return res.render('index1', {
                isAuthenticated: req.user ? true : false,
                nav: true
            });
        } catch (err) {
            console.log("index home err -- ", err);
            return res.send({'success': false, "msg": "Server error occurred",nav:true});
        }
    });



module.exports = router;