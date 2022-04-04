const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')

// test API
router.get('/test', function(req, res){
    res.send({status : true, message : "Test API working fine"})
})

router.post('/url/shorten', urlController.createUrl )

router.get('/:urlCode', urlController.getUrl)








module.exports = router





