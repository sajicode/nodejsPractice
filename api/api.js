var express = require("express"),
    api = express.Router(),
    customerRouter = require("./v1/customer/customer-router.js"),
    userRouter = require("./v1/user/user-router.js"),
    authRouter = require("./v1/auth/auth-router.js");

api.use("/customers", customerRouter);
api.use("/users", userRouter);
api.use("/auth", authRouter);

module.exports = api;