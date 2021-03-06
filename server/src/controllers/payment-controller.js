class PaymentController {
    static calculatePayment(req, res) {
        const keys = Object.keys(req.body);
        if (keys.length !== 3 || !keys.includes('principal') || !keys.includes('rate') || !keys.includes('term')) {
            return res.status(400).send({ payment: 0})
        } else if (req.body.principal < 0 || req.body.rate < 0) {
            return res.status(400).send({ payment: 0})
        } else {
            const monthlyRate = req.body.rate / 12;
            const paymentCount = req.body.term * 12;
            const payment = req.body.principal * ((monthlyRate * Math.pow((1 + monthlyRate), paymentCount)) / (Math.pow((1 + monthlyRate), paymentCount) - 1))
            return res.send({'payment': Math.round(payment * 100) / 100});
        }
    }
}

module.exports = PaymentController;