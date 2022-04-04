
// const urlModel=require('../models/urlModel')
// const validUrl = require('valid-url')
// const shortid = require('shortid')

// const isValid = function (value) {
//     if (typeof value === 'undefined' || value === null) return false; 
//     if (typeof value === 'string' && value.trim().length === 0) return false;
//     return true
// }
// const isValidBody = function (body) {
//     return Object.keys(body).length > 0;
// }



//   const createUrl = async function(req,res) {
//     try {               
//         const data = req.body
        
//         // Validate body
//         if (!isValidBody(data)){
//             return res.status(400).send({ststus:false,message:"data is required"})
//         }
//         // Validate query(it must not be present)
//         const query = req.query;
//         if(isValidBody(query)) {
//             return res.status(400).send({ status: false, msg: "Invalid parameters.This is not allow "});
//         }
//         const params = req.params;
//         if(isValidBody(params)) {
//             return res.status(400).send({ status: false, msg: "Invalid parameters.Invalid request this is not allow"})
//          } 

//         const longUrl = req.body.longUrl
//         if(!isValid(longUrl.trim())) {
//             return res.status(400).send({status: false, message:"Please provide longUrl"})
//         }

//         const urlCode = shortid.generate()
//         //Validation for longUrl
//         if(validUrl.isUri(longUrl.trim())) {

//             let url = await urlModel.findOne({longUrl: longUrl}).select({longUrl:1, shortUrl:1, urlCode:1})
//             if(url) {
//                 return res.status(200).send({status:true,message: "The URL is already shortened", data: url.shortUrl})
//             } 
//         } else {
//             return res.status(401).send({status: false, message: "Invalid longUrl"})
//         }


//         const baseUrl = 'http://localhost:3000'

//         if(!validUrl.isUri(baseUrl)) {
//             return res.status(401).send({ status: false, message: "Invalid baseUrl"})
//         }
    
//         // To create shortUrl from longUrl. We have to combine baseUrl with the urlCode.
//         const shortUrl = baseUrl + '/' + urlCode.toLowerCase()
       
//         let input = {longUrl: data.longUrl, shortUrl: shortUrl, urlCode: urlCode}
       
//         finalurl = await urlModel.create(input)
//         const createdUrl = {longUrl:finalurl.longUrl, shortUrl:finalurl.shortUrl, urlCode:finalurl.urlCode}
       
//         return res.status(201).send({status: true, data: createdUrl})
    
    

//         // let inputData = {
//         //     longUrl: data.longUrl,
//         //      shortUrl: shortUrl,
//         //       urlCode: urlCode
//         //     }
//         // console.log(inputData);

//         // newUrl = await urlModel.create(inputData)

//         // const createdUrl = {longUrl:newUrl.longUrl, shortUrl:newUrl.shortUrl, urlCode:newUrl.urlCode}
//         // console.log(createdUrl);

//         // return res.status(201).send({status: true,data:createdUrl})
        
//     }
//     catch (err) {
//        //console.log("This is the error :", err.message)
//         return res.status(500).send({ status:false,message: "Error" })
//     }
// }



// const getUrl= async function(req,res){
//     try{
//     let urlcode= req.params.urlCode

//    if(!isValid(urlcode.trim().toLowerCase())){
//        return res.status(400).send({status:false, message:"Please Provide a urlcode"})
//    }
//    if(isValidBody(req.body)) {
//     return res.status(400).send({status: false, msg: "Invalid parameters. Body should not be present"})
// }

// const query = req.query;
//         if(isValidBody(query)) {
//             return res.status(400).send({ status: false, msg: "Invalid parameters. Query must not be present"});
//         }

//     const code= await urlModel.findOne({urlcode:urlcode}).select({createdAt:0,updatedAt:0,__v:0})
//     if(code) {
//         return res.status(302).redirect(code.longUrl);
//     } else{
//         return res.status(404).send({status: false, msg: "Not found urlcode and no urlcode matches "})
//     }

  
// }

// catch(err){
//     return res.status(500).send({status:false, message:"error"})
// }
// }
// module.exports.createUrl = createUrl
// module.exports.getUrl=getUrl
// //----------------------------------------------------------------------------------------------------------



const UrlModel = require('../Models/urlModel')
const validUrl = require('valid-url')
const shortid = require('shortid')

// Validation
const isValidBody = function (body) {
    return Object.keys(body).length > 0;
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false; 
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true
}


const createUrl = async function(req,res) {
    try {
        const data = req.body
        // Validate body(body must be present)
        if(!isValidBody(data)) {
            return res.status(400).send({status: false, msg: "Body must not be empty"})
        }

        // Validate query(it must not be present)
        const query = req.query;
        if(isValidBody(query)) {
            return res.status(400).send({ status: false, msg: "Invalid parameters. Query must not be present"});
        }

        // Validate params(it must not be present)
        const params = req.params;
        if(isValidBody(params)) {
            return res.status(400).send({ status: false, msg: "Invalid parameters. Params must not be present"})
        }

        // longUrl must be present in body
        const longUrl = data.longUrl
        if(!isValid(longUrl.trim())) {
            return res.status(400).send({status: false, msg:"Please provide longUrl"})
        }

        const urlCode = shortid.generate()

        // Validation of longUrl
        if(validUrl.isUri(longUrl.trim())) {
            let url = await UrlModel.findOne({longUrl: longUrl}).select({longUrl:1, shortUrl:1, urlCode:1})
            if(url) {
                return res.status(200).send({status: true,msg: "The URL is already shortened", data: url.shortUrl})
            } 
        } else {
            return res.status(401).send({status: false, msg: "Invalid longUrl"})
        }


        const baseUrl = 'http://localhost:3000'

        // Validation of baseUrl
        if(!validUrl.isUri(baseUrl)) {
            return res.status(401).send({ status: false, msg: "Invalid baseUrl"})
        }
        
        // To create shortUrl from longUrl. We have to combine baseUrl with the urlCode.
        const shortUrl = baseUrl + '/' + urlCode.toLowerCase()

        let input = {longUrl: data.longUrl, shortUrl: shortUrl, urlCode: urlCode}
        
        finalurl = await UrlModel.create(input)
        const createdUrl = {longUrl:finalurl.longUrl, shortUrl:finalurl.shortUrl, urlCode:finalurl.urlCode}
        
        return res.status(201).send({status: true, data: createdUrl})
        
    }
    catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.createUrl = createUrl






const getUrl = async function(req,res) {
    try {
        const urlCode = req.params.urlCode
        // Validate params(it must be present)
        if(!isValid(urlCode.trim().toLowerCase())) {
            return res.status(400).send({status: false, msg: "Please provide urlCode"})
        }

        // Validate body(it must not be present)
        if(isValidBody(req.body)) {
            return res.status(400).send({status: false, msg: "Body should not be present"})
        }

        // Validate query(it must not be present)
        const query = req.query;
        if(isValidBody(query)) {
            return res.status(400).send({ status: false, msg: "Invalid parameters. Query must not be present"});
        }

        const url = await UrlModel.findOne({urlCode: urlCode}).select({createdAt:0,updatedAt:0,__v:0})
        if(url) {
            return res.status(302).redirect(url.longUrl);
        } else{
            return res.status(404).send({status: false, msg: "No urlCode matches"})
        }
    }
    catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}


module.exports.getUrl=getUrl