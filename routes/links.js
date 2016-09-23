var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var linksModel = require('../public/javascripts/database/linksModel');
var config = require('../public/javascripts/database/config');
mongoose.connect(config.database, function (err, db) {
    if (err){
        console.log('error...');
        console.log(err);
    }
    else{
        console.log('database is connected and LinksLibraryDB has been created...!')
    }
});

router.get('/linksList', function (req, res) {
    linksModel.find(function(err, data) {
        if (err)
            res.send(err);

        res.status(200).json(data);
    });
});
router.post('/addLink', function (req, res) {

    (new linksModel({
        link: req.body.linkUrl,
        title: req.body.title,
        subject: req.body.subject,
        rate: Number(req.body.rate == null || req.body.rate == undefined ? 0 : req.body.rate),
        description: req.body.description
    })).save(function (err,data) {
            if (err) {
                res.status(500).json({ message: 'Could not connect to the database.'});
            } else {
                res.status(200).json({ message: 'Successfully data registered ... '});

            }
        });
});
router.put('/editLink', function (req, res) {

    linksModel.findByIdAndUpdate(req.body._id, {
        link: req.body.linkUrl,
        title: req.body.title,
        subject: req.body.subject,
        rate: Number(req.body.rate == null || req.body.rate == undefined ? 0 : req.body.rate),
        description: req.body.description
    }, function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Could not connect to the database.'});
        } else {
            res.status(200).json({ message: 'Successfully data updated ... '});

        }
    });
});
router.delete('/deleteLink/:id', function (req, res) {
    console.log(req.params.id);
    linksModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Could not connect to the database.'});
        } else {
            res.status(200).json({ message: 'Successfully data deleted ... '});

        }
    });
});

module.exports = router;