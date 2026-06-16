const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    })
};

const fetchPendingEmails = async (timestap) => {
    try {
        const res = await repo.get({status: "PENDING"});
        return res;
    } catch (error) {
        console.log(error);
    }
};

const createNotification = async (data) => {
    try {
        const notif = await repo.create(data);
        return notif;
    } catch (error) {
        console.log(error);
    }
}

const updateStatus = async (ticketId, data) => {
    try {
        const notif = await repo.update(ticketId, data);
        return notif;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    sendBasicEmail,
    fetchPendingEmails, 
    createNotification,
    updateStatus
}