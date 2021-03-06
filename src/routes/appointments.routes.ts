import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repository/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all()

    return response.json(appointments)
})


appointmentsRouter.post('/', (request, response) => {

    try {

        const { provider, date } = request.body

        const parsedDate = parseISO(date);
        const createAppointmentService = new CreateAppointmentService(
            appointmentsRepository
        );

        const appointment = createAppointmentService.execute({
            date: parsedDate,
            provider
        });

        return response.json(appointment)

    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
});


export default appointmentsRouter