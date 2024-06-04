const { instance } = require("../config/razorpay");
const userSchema = require("../models/User");
const mailSender = require("../utils/mailSender");
const { paymentSuccess } = require("../template/paymentSuccess");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const turfSchema = require("../models/Turf");
const userPriceHistorySchema = require("../models/UserPriceHistory");


module.exports.capturePayment = async (req, res) => {
    //get courseId and UserID
    //validation
    //valid courseID
    console.log("activated");
    try {
        console.log("turf: ", req.body);
        const { turf, turfprice } = req.body;
        const userId = req.user.id;
        if (!turf) {
            return res.json({
                success: false,
                message: 'Please provide valid turf ID',
            })
        };

        // let totalAmount = turfprice;
        let totalAmount = 1;



        // console.log("courseid=",course_id);
        let turfDetails;
        try {
            turfDetails = await turfSchema.findById({ _id: turf });
            if (!turfDetails) {
                return res.json({
                    success: false,
                    message: 'turf not find the course',
                });
            }

        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        // totalAmount += course.price;

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        };

        try {
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log("payment", paymentResponse);
            //return response
            return res.status(200).json({
                success: true,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
                data: paymentResponse
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};



//verify the signature
module.exports.verifySignature = async (req, res) => {
    //get the payment details
    console.log("verify payment");
    console.log("req.body: ", req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const { turf, amount, time } = req.body;
    const userId = req.user.id;


    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: 'Payment details are incomplete',
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const enrolleStudent = async (turf, userId) => {
        if (!turf || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid turf and user ID',
            });
        }
        try {
            //update the course

            console.log("verify turf=", turf);

            const History = await userPriceHistorySchema.create({
                price: amount,
                time: time,
                turfId: turf,
            });

            //update the user
            const user = await userSchema.findByIdAndUpdate(
                { _id: userId },
                {
                    $push: {
                        turfs: turf,
                        history: History._id
                    }
                },
                { runValidators: true, new: true }
            );

            const turfDetails = await userSchema.findByIdAndUpdate(
                { _id: turf },
                {
                    $set: {
                        price: price,
                        time: amount
                    }
                }, { new: true }
            )
            // await user.save();

            console.log("user: ", user);



            //send email
            const recipient = await userSchema.findById(userId);
            console.log("recipient=>", recipient);

            return res.status(200).json({
                success: true,
                message: 'Payment successful',
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

    }

    try {
        //verify the signature
        const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
        if (generatedSignature === razorpay_signature) {
            await enrolleStudent(turf, userId);
        }

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


}




//send email

module.exports.sendPaymentSuccessEmail = async (req, res) => {
    const { amount, paymentId, orderId } = req.body;
    const userId = req.user.id;
    if (!amount || !paymentId) {
        return res.status(400).json({
            success: false,
            message: 'Please provide valid payment details',
        });
    }
    try {
        const userDetails = await userSchema.findById(userId);
        await mailSender(
            userDetails.email,
            `turfXL Payment successful`,
            paymentSuccess(amount / 100, paymentId, orderId, userDetails.firstName, userDetails.lastName),
        );
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

