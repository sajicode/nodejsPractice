var express = require("express"),
    app = express(),
    bps = require("body-parser"),
    morgan = require("morgan"),
    customerModel = require("./api/v1/customer/customer-model.js");

app.use(morgan("dev"));

app.use(bps.json());
app.use(bps.urlencoded({extended: true}));

//endpoints start here
app.param("id", function (id, req, res, next) {
    
    customerModel.findById(id, function(err, data) {
        if (err) {
            return next(new Error("...."));
        }

        req.student = data;
        next();
    });
});

app.post("/addCustomer", function(req, res, next) {
    var client = req.body;

    var customer = new customerModel(client);
    customer.save(function(err, data) {
        if(err) {
            return next(new Error("could not add customer"))
        }

        res.status(200).json(data);
    });
});

app.get("/getStudents", function(req, res, next) {
    customerModel.findById(function(err, data) {
        if(err) {
            return next(new Error("could not get customers"))
        }
    })
})