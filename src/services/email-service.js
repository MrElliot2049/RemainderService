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

const subscribeEvent = async (payload) => {
    let service = payload.service;
    let data = payload.data;
    switch(service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_EMAIL':
            await sendBasicEmail(data);
            break;
        default:
            console.log('No valid thing received');
            break;
    }
}
module.exports = {
    sendBasicEmail,
    fetchPendingEmails, 
    createNotification,
    updateStatus,
    subscribeEvent
}