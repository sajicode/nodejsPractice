var express = require("express"),
    router = express.Router(),
    controller = require("./customer-controller.js"),
    auth = require("../auth/auth.js");

router.param("/:id", controller.interceptIds);

router.route("/")
    .post(controller.addCustomer)
    .get(controller.getCustomers)

router.route("/:id")
    .get(controller.getCustomer)
    .put(controller.updateCustomer)
    .delete(controller.deleteCustomer)

module.exports = router;