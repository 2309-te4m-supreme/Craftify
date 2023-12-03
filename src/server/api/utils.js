function requireUser(req, res, next) {
    console.log("made it to the top, now we're here")
    if (!req.user) {
        res.status(401);
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }

    next();
}

module.exports = {
    requireUser,
}