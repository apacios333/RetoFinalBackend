
//validación del rol, si se cumple, para a la siguiente orden en router
const validationRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(401).send({message: 'Unauthorized role'})
    next();
}

module.exports = validationRole
