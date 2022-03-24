var router = require('express').Router();
var auth = require('../middlewares/auth');
var course = require('../controllers/courseCtrl');
var Course = require('../models/course');
var Blog = require('../models/blog');


router.route('/')
.get(auth, async(req, res) => {
    try{
        if(!req.user){
            return res.redirect('/');
        }
        var page = req.query.page;
        if(!page){
            page = 1;
        }
        var bop = 3;
        
        var time = parseInt(Date.now() / 60000);
        var courses = await Course.find({});
        courses.reverse();
        var total = courses.length;
        var last = Math.floor(total/bop) + 1 - ((total%bop == 0) ? 1 : 0);
        page = Math.min(last, page);
        page = Math.max(1, page);
        page--;
        courses = courses.slice(page*bop, Math.min(total, (page+1)*bop));
        return res.render('course', {course: courses, time: time, cuser: req.user.username, page: page+1, last: last, isAuthenticated: req.user ? true : false,nav:true});
    } catch (err) {
        console.log("course home error", err);
        return res.send(err);
    }
});


router.route('/add')
.get(auth, async(req, res) => {
    try{
        if(!req.user){
            return res.redirect('/');
        }
        console.log(req.user);
        if(req.user.type == "student"){
            return res.status(400).json({ success: false, msg: "Access Denied for students",nav:false})
        }
        return res.render('addCourse', {
            isAuthenticated: req.user ? true : false,
            nav:false
        });
    } catch (err) {
        console.log("course add error", err);
        return res.send(err);
    }
})
.post(auth, course.add);

router.route('/expand/:id')
.get(auth, async(req, res) => {
    try{
        console.log("course expand", req.params.id);
        var core = await Course.findOne({ cid: req.params.id });
        var id = req.params.id.toString();
        var blogs = await Blog.find({cid: id});
        console.log(blogs);
        res.render("expandCourse", { course: core, blog:blogs, isAuthenticated: req.user ? true : false,nav:false });
    } catch (err){
        console.log("course expand error");
        return res.send(err);
    }
        
});

router.route("/edit/:id")
.get(auth, async(req, res) => {
    console.log("edit course get ", req.body);
    try{
        if(req.user.type == "student"){
            return res.status(400).json({ success: false, msg: "Access Denied for students",nav:false})
        }
        
        var blog = await Course.findOne({ cid: req.parama.id });
        if (req.user) {
            res.render("editCourse", { course: blog, isAuthenticated: req.user ? true : false ,nav:false});
        } else {
            res.redirect("/auth/login");
        }
    } catch (err) {
        console.log("edit course err -- ", req.body.cid, err);
        return res.send(err);
    }
})
.post(auth, course.edit);

router.route('/remove/:id')
.get(auth,(req,res)=>{
     course.remove;
})


module.exports = router;