module.exports = {
    addTotalCountHeader: async (req, res, next) => {
        console.log(req)
        res.append('X-Total-Count', 1);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');
        next();
    }
}