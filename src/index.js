const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const { sendBasicEmail} = require('./services/email-service');
const job = require('./utils/jobs');
const TicketController = require('./controller/ticket-controller');
const { createChannel } = require('./utils/messageQueue');

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.post('/api/v1/tickets', TicketController.create);
    const channel = await createChannel();

    app.listen(PORT, () => {
        console.log(`Server started listening on ${PORT}`);
        job();
    });
}

setupAndStartServer(); 