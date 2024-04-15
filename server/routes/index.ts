import express from 'express';
const router = express.Router();
import Contact from '../models/contact';
import {HttpError} from "http-errors";
import User from '../models/user';
import {AuthGuard, UserDisplayName} from "../util/index";
import passport from "passport";

/** TOP-LEVEL ROUTES **/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page : "home", displayName : UserDisplayName(req) });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page : "home", displayName : UserDisplayName(req) });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page : "about", displayName : UserDisplayName(req) });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page : "contact", displayName : UserDisplayName(req) });
});

router.get('/products', function(req, res, next) {
    res.render('index', { title: 'Products', page : "products", displayName : UserDisplayName(req) });
});

router.get('/services', function(req, res, next) {
    res.render('index', { title: 'Services', page : "services", displayName : UserDisplayName(req) });
});

/** AUTHENTICATIONS ROUTES **/
router.get('/login', function(req, res, next) {

    if(!req.user) {
        return res.render('index',
            {title: 'Login', page: "login", messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }
    return res.redirect('/contact-list');
});

router.post('/login', function(req, res, next) {

    passport.authenticate('local', function (err: Error, user: Express.User, info: string){

        // Check if there was an error during authentication.
        if(err){
            console.error(err);
            res.end();
        }

        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login'); // Status 302.
        }

        // Attempt to log in the user (establish a login session).
        req.logIn(user, function(err){
            if(err){
                console.error(err);
                res.end();
            }
            res.redirect('/contact-list');
        });

    })(req, res, next);     // IIFE.
});

router.get('/register', function(req, res, next) {

    if(!req.user) {
        res.render('index',
            {title: 'Register', page: "register", messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
    }
    return res.redirect('/contact-list');
});

router.post('/register', function(req, res, next) {

    let newUser = new User(
        {
            username: req.body.username,
            EmailAddress: req.body.emailAddress,
            DisplayName: req.body.firstName + ' ' + req.body.lastName
        }
    );

    console.log("username: " + req.body.username);
    console.log("email: " + req.body.emailAddress);
    console.log("password: " + req.body.password);

    User.register(newUser, req.body.password, function(err) {

        if(err){
            let errorMessage = "Server Error";
            if(err.name == "UserExistsError"){
                console.error("Error: User Already Exists");
                errorMessage = "Registration Error";
            }
            req.flash('registerMessage', errorMessage);
            res.redirect('/register');
        } else {

            return passport.authenticate('local')(req, res, function () {
                return res.redirect('/contact-list');
            });
        }

    });
});

router.get('/logout', function(req, res, next){
    req.logOut(function(err){
        if(err){
            console.error(err);
            res.end();
        }
        res.redirect('/login');
    });
});

/** CONTACT-LIST ROUTES **/
router.get('/contact-list', AuthGuard, function(req, res, next) {

  Contact.find().then(function(data : any){
    //console.log(data);
    res.render('index', { title: 'Contact List', page: "contact-list", contacts : data, displayName: UserDisplayName(req) });

  }).catch(function(err : HttpError){
    console.error("Encountered an Error reading contacts from the Database: " + err);
    res.end();
  });

});

router.get('/edit/:id', AuthGuard, function(req, res, next) {

  let id = req.params.id;

  Contact.findById(id).then(function(contactToEdit){

    res.render('index', { title: 'Edit Contact', page: "edit", contact: contactToEdit, displayName: UserDisplayName(req) });

  }).catch(function(err){
    console.error(err);
    res.end();
  });

});

router.get('/add', AuthGuard, function(req, res, next) {
    res.render('index', { title: 'Add Contact', page: "edit", contact: '', displayName: UserDisplayName(req) });
});

router.get('/delete/:id', AuthGuard, function(req, res, next) {

    let id = req.params.id;

    Contact.deleteOne({_id: id}).then(function(){
        res.redirect('/contact-list');
    }).catch(function(err){
        console.error(err);
        res.end(err);
    });

});

router.post('/edit/:id', AuthGuard, function(req, res, next){

  let id = req.params.id;

  let updatedContact = new Contact (
      {
        "_id": id,
        "FullName" : req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
      }
  );

  Contact.updateOne( {_id: id}, updatedContact).then(function(){
    res.redirect('/contact-list');
  }).catch(function(err) {
    console.error(err);
    res.end(err);
  });
});

router.post('/add', AuthGuard, function(req, res, next){

  let newContact = new Contact (
      {
        "FullName" : req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
      }
  );

  Contact.create(newContact).then(function(){
    res.redirect('/contact-list');
  }).catch(function(err) {
    console.error(err);
    res.end(err);
  });

});

export default router;
