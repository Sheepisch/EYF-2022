const express = require('express')
const router = express.Router()
const mysql = require('../../../db_config')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')

const passport = require('passport')
const initializePassport = require('./passport-config')
initializePassport(passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

router.use(express.urlencoded({ extended: false }))
router.use(flash())
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

// quick fix for login without db
const users = [];

router.get('/', checkAuthenticated, (req, res) => {
    mysql.query('SELECT * FROM product', (err, results) => {
        if (err) throw err
        res.render('admin/beheer', {products: results})
    })
})

router.post('/add_product', (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const description = req.body.description;
    const img = req.body.img;

    mysql.query('INSERT INTO product (name, category, price, description, img) VALUES (?, ?, ?, ?, ?)', [name, category, price, description, img], (err, results) => {
        if (err) throw err
        res.redirect('/admin');
    })
});

router.get('/delete_product/:product_id', (req, res) => {
})

router.get('/update_product/:product_id', (req, res) => {
})

router.put('/update_product/:product_id', (req, res) => {
    const product_id = req.params.product_id;
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const description = req.body.description;
    const img = req.body.img;
   
    try {
        mysql.query('UPDATE product SET name = ?, category = ?, price = ?, description = ?, img = ? WHERE product_id = ?', [name, category, price, description, img, product_id], (err, results) => {
            if (err) throw err
            res.redirect('/admin');
        }) 
    }catch (err) {
        console.log(err);
    }

});

router.get('/getProduct/:product_id', (req, res) => {
    const product_id = req.params.product_id;
    mysql.query('SELECT * FROM product WHERE product_id = ?', [product_id], (err, results) => {
        if (err) throw err
        res.render('admin/update_product', {product: results[0]})
    });
});


router.delete('/delete_product/:product_id', (req, res) => {
    const product_id = req.params.product_id;
    try {
        mysql.query('DELETE FROM product WHERE product_id = ?', [product_id]);
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
});

router.get('/login',checkNotAuthenticated, (req, res) => {
    res.render('admin/login');
});

router.get('/register',checkNotAuthenticated,  (req, res) => {
    res.render('admin/register');
});

router.post('/login',checkNotAuthenticated,  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

router.get('/register',checkNotAuthenticated, (req, res) => {
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword
        });
        
        res.redirect('/admin/login');
    }
    catch {
        res.redirect('/admin/register');
    }
});

router.delete('/logout', (req, res) => {
    req.logout(function(error) {
        if(error) {
            return next(error);
        }
        res.redirect('/admin/login');
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/admin/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin');
    }
    next();
}

module.exports = router