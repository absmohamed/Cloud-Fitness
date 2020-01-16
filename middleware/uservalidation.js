// middleware functions
const userAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
    }
}

const isAdmin = function (req, res, next) {
    if (req.user.role === 'admin') return next();
    else res.sendStatus(403);
}




const verifyOwner = function (req, res, next) {
    //if booking user isn't currently logged in user, send forbidden
    if (req.user.role === 'admin') {
        console.log('have admin user in middleware')
        next();
    } else {
        getBookingById(req).exec((err,post) => {
            if (err) {
                req.error = {
                    message: 'Booking not found',
                    status: 404
                }
                next();
            }
            if (req.user.email !== post.email) {
                req.error = {
                    message: 'You do not have permission to modify this booking',
                    status: 404
                };
            }
            next();
        });
    }
}

const Booking = require('../../models/booking')

module.exports = {
    isAdmin,
    userAuthenticated,
    verifyOwner
};