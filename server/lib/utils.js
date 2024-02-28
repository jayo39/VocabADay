const jwt = require('jsonwebtoken');
const multer = require('multer');


module.exports = {
    loginRequired: (req, res, next) => {
        const token = req.headers.authorization.replace('Bearer ', '');
        try{
            let loginUser = jwt.verify(token, 'vadToken');
            let loginUsername = loginUser.username;
            let loginId = loginUser.id;

            req.loginUsername = loginUsername;
            req.loginId = loginId;
            next();
        } catch (err){
            if(err.name === 'JsonWebTokenError') {
                res.status(500).json({errno:1, msg:'Invalid Token'});
                return;
            } else if (err.name === 'TokenExpiredError') {
                res.status(500).json({errno:2, msg:'Token Expired'});
                return;
            } else {
                res.status(500).json({errno:3, msg:'Server Error'});
                return;
            }
        }
    },
    adminRequired: (req, res, next) => {
        const token = req.headers.authorization.replace('Bearer ', '');
        try {
            let loginUser = jwt.verify(token, 'vadToken');
            let userRole = loginUser.role;
            let loginUsername = loginUser.username;

            if(userRole !== 'ADMIN') {
                res.status(500).json({errno:2, msg: 'No permission'});
            }

            req.role = userRole;
            req.loginUsername = loginUsername;
            next();
        } catch(err) {
            if(err.name === 'JsonWebTokenError') {
                res.status(500).json({errno:1, msg:'Invalid Token'});
                return;
            } else if (err.name === 'TokenExpiredError') {
                res.status(500).json({errno:1, msg:'Token Expired'});
                return;
            } else {
                res.status(500).json({errno:1, msg:'Server Error'});
                return;
            }
        }
    },
    imgUpload: multer({
        storage: multer.diskStorage({
            destination : (req, file, cb)=>{
                cb(null, '../public/bookImg/');
            },
            filename : (req, file, cb)=>{
                const exp = file.originalname.substring(file.originalname.lastIndexOf('.'));

                let now = new Date();
                cb(null, `${now.getTime()}${exp}`);
            }
        }),
    }),
};