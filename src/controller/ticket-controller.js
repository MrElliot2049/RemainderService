const TicketService = require('../services/email-service');

const create = async (req, res) => {
    try {
        const response = await TicketService.createNotification(req.body);
        return res.status(201).json({
            sucess: true,
            data: response,
            message: "Ticket created!!",
            err : {}
        });
    } catch (error) {
       return res.status(500).json({
            sucess: false,
            data: response,
            message: "Ticket not created!!",
            err : error
        });
    }
}

module.exports = {
    create
};