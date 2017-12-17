var customerModel = require("./customer-model.js");

exports.interceptIds = function(req, res, next, id) {

    customerModel.findById(id, function(err, data) {
        if(err) {
            return next(new Error("...."))
        }

        req.client = data;
        next();
    })
}

exports.addCustomer = function(req, res, next) {
    var client = req.body;

    var customer = new customerModel(client);
    customer.save(function(err, data) {
        if(err) {
            return next(new Error("cannot add customer"))
        }

        res.status(200).json(data);
    })
}

exports.getCustomers = function(req, res, next) {
    customerModel.find(function(err, data) {
        if(err) {
            return next(new Error("cannot get students"));
        }
        res.status(200).json(data)
    });
}

exports.getCustomer = function(req, res, next) {
    if(!req.client) {
        return next(new Error("could not find customer"))
    }
    res.status(200).json(data);
}

exports.updateCustomer = function(req, res, next) {
    customerModel.update({_id: req.client._id}, req.body, (err, res) => {
        if(err) {
            return next(new Error("could not update customer"))
        }
    })
    res.status(200).json(data);
}

exports.deleteStudent = function(req, res, next) {
    customerModel.remove({_id: req.client._id}, (err, res) => {
        if(err) {
            return next(new Error("customer could not be deleted"));
        }
        res.status(200).json(req.client);
    })
}