var Course = require('../models/course');
var createDom = require("dompurify");
var { JSDOM } = require("jsdom");
var domPurify = createDom(new JSDOM().window);
var marked = require('marked');

var courseCtrl = {
    add: async(req, res) => {
        var d = req.body;
        console.log("Course Data is ----> ");
        console.log(d);
        try{
           // console.log("blog add -- ", req.body, req.user);
            //var shtml = domPurify.sanitize(marked.parse(req.body.));
            var ck = await Course.findOne({cid:req.body.cid});
            if(ck){
                return res.send({success:false,err:"course id already exits"});
            }
            //console.log(shtml);
            var course = new Course({
                cid: req.body.cid,
                name: req.body.name,
                duration: req.body.duration,
                description: req.body.description,  
                banner: req.body.banner,
            });
            console.log("new course -- ", course);
            await course.save();
            return res.send({success: true});
        } catch (err){
            console.log("post add course err -- ", err);
            return res.send({success: false, err: err});
        }
    },

    edit: async(req, res) => {
        try{
            if(!req.user){
                return res.redirect('/auth/login');
            }
            //console.log("edit course post -- ", req.params.id);
            var course = await Course.findOne({cid: req.body.cid});
            if(req.user.type !== "student"){
                return res.json({success: false, msg: "Access Denied"});
            }
            //var shtml = domPurify.sanitize(marked.parse(req.body.body));
            await Course.updateOne({cid: req.body.cid}, {$set: {name:req.body.name,duration: req.body.duration,description: req.body.description,banner: req.body.banner}});

            console.log("Course updated");
            return res.redirect('/course');
        } catch (err) {
            console.log("edit course post err -- ", req.params.id, err);
            return res.send(err);
        }
    },

    remove: async(req, res) => {
        try{
            if(!req.user){
                return res.redirect('/auth/login');
            }
            var course = await Course.findOne({cid: req.body.cid});
            if(req.user.type !== "student"){
                return res.json({success: false, msg: "Access Denied"});
            }
            console.log("remove course post -- ",req.body.cid);
            await Course.findOneAndDelete({cid:req.body.cid});
            console.log("deleted course post");
            res.send({success: true});
        } catch (err) {
            console.log("remove course post err -- ", req.body.cid, err);
            return res.send({success: false, err: err});
        }
    }
}


module.exports = courseCtrl;