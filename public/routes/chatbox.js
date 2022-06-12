const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('chatBox');
});

router.get('/chatroom', (req, res) => {
    res.render('chatroom');
});

module.exports = router