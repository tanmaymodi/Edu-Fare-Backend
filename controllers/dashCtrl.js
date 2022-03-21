var {PersonalData} = require('../models/personalData');
var createDom = require("dompurify");
var { JSDOM } = require("jsdom");
var domPurify = createDom(new JSDOM().window);
var marked = require('marked');

var dashCtrl = {
    // view: async(req, res) => {
    //     var d = req.body;
    //     console.log(d);
    //     try{
    //        // console.log("blog add -- ", req.body, req.user);
    //         var shtml = domPurify.sanitize(marked.parse(req.body.explanation));
    //         //console.log(shtml);
    //         var blog = new Blog({
    //             cid: req.body.cid,
    //             heading: req.body.heading,
    //             description: req.body.description,
    //             explanation: req.body.explanation,
    //             images: req.body.images,
    //             username: req.user.username,
    //             sanitizedHtml: shtml,
    //             mid: req.user.username + "-" + (parseInt(Date.now() / 60000).toString()),
    //             did: parseInt(Date.now() / 60000)
    //         });
    //         console.log("new blog -- ", blog);
    //         await blog.save();
    //         return res.send({success: true});
    //     } catch (err){
    //         console.log("post add blog err -- ", err);
    //         return res.send({success: false, err: err});
    //     }
    // },

    edit: async(req, res) => {
        console.log("__________Updating Dash_________\n"+newData);
        try{
            if(!req.user){
                return res.redirect('/auth/login');
            }
            //console.log("edit blog post -- ", req.params.id);
            var previousData = await PersonalData.findOne({username: req.user.username});
            var newData = req.body;
            
            // if(req.user.username !== blog.username){
            //     return res.json({success: false, msg: "Access Denied"});
            // }
            //var shtml = domPurify.sanitize(marked.parse(req.body.body));

            await PersonalData.updateOne(previousData, {$set: newData});
            console.log("Profile updated");
            return res.redirect('../');
        } catch (err) {
            console.log("edit profile err -- ", req.user.username, err);
            return res.send(err);
        }
    },
}
module.exports = dashCtrl;