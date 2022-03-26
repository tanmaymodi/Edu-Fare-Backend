var Blog = require('../models/blog');
var createDom = require("dompurify");
var { JSDOM } = require("jsdom");
var domPurify = createDom(new JSDOM().window);
var marked = require('marked');


var blogCtrl = {
    add: async(req, res) => {
        var d = req.body;
        console.log(d);
        try{
           // console.log("blog add -- ", req.body, req.user);
            var shtml = domPurify.sanitize(marked.parse(req.body.explanation));
            //var sml = domPurify.sanitize(marked.parse(req.body.ml));
            
            //console.log(shtml);
            var blog = new Blog({
                cid: req.body.cid,
                heading: req.body.heading,
                description: req.body.description,
                explanation: req.body.explanation,
                images: req.body.images,
                username: req.user.username,
                ml:req.body.ml,
                sanitizedHtml: shtml,
                mid: req.user.username + "-" + (parseInt(Date.now() / 60000).toString()),
                did: parseInt(Date.now() / 60000)
            });
            console.log("new blog -- ", blog);
            await blog.save();
            return res.send({success: true});
        } catch (err){
            console.log("post add blog err -- ", err);
            return res.send({success: false, err: err});
        }
    },

    edit: async(req, res) => {
        console.log(req.body);
        try{
            if(!req.user){
                return res.redirect('/auth/login');
            }
            console.log("edit blog post -- ", req.params.id);
            var blog = await Blog.findOne({mid: req.params.id});
            if(req.user.username !== blog.username){
                return res.json({success: false, msg: "Access Denied"});
            }
            //var sml = domPurify.sanitize(marked.parse(req.body.ml));
            await Blog.updateOne({mid: req.params.id}, {$set: {heading: req.body.heading,cid:req.body.cid, description: req.body.description, explanation: req.body.explanation, images: req.body.images,ml:req.body.ml}});
            console.log("Blog updated");
            return res.redirect('/blog');
        } catch (err) {
            console.log("edit blog post err -- ", req.params.id, err);
            return res.send(err);
        }
    },

    remove: async(req, res) => {
        try{
            if(!req.user){
                return res.redirect('/auth/login');
            }
            var blog = await Blog.findOne({mid: req.params.id});
            if(req.user.username !== blog.username){
                return res.json({success: false, msg: "Access Denied"});
            }
            console.log("remove blog post -- ", req.params.id);
            await Blog.findOneAndDelete({mid: req.params.id});
            console.log("deleted blog post");
            res.send({success: true});
        } catch (err) {
            console.log("remove blog post err -- ", req.params.id, err);
            return res.send({success: false, err: err});
        }
    }
}


module.exports = blogCtrl;