export function checkUser(req, res, next) {
    if(!req.session.user) {
        res.redirect('/')
    }

    next();
}