var router = require('express').Router();
var auth = require('../middlewares/auth');
var {PersonalData} = require('../models/personalData');
var pd = require('../controllers/dashCtrl')

router.route('/')
    .get(auth, async(req, res) => {
        try {
            if(!req.user){
                return res.redirect('/');
            }
            console.log("d");
            var perData =  await PersonalData.findOne({username: req.user.username});
            if(perData){
                console.log(perData);
            }
            else{
                perData = 'null';
            }

            res.render('dashboard', {
                isAuthenticated: req.user ? true : false,
                user: req.user,
                ped: perData,
                nav: true
            });
        } catch (err) {
            console.log("dashboard err -- ", err);
            return res.send({"success": false, msg: "Server error occurred",nav:true});
        }
    })
    //ok

router.route("/edit")
    .get(auth, async(req, res) => {
        try{
            console.log("editing dash of ----> " + req.user.username);
            var pro = await PersonalData.findOne({ username: req.user.username });
            if (req.user) {
                res.render("editDash", { pde:pro, isAuthenticated: req.user ? true : false ,nav:false});
            } else {
                res.redirect("/auth/login");
            }
        } catch (err) {
            console.log("edit dashboard err -- ", req.params.id, err);
            return res.send(err);
        }
    })
    .post(auth, pd.edit);

module.exports = router;