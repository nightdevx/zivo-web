import API from "../config/axios.config";
import { Appointment } from "../models/appointments.model";

class AppointmentsService {
  async getAppointments() {
    const response = await API.get<Appointment[]>("/appointments");
    return response.data;
  }

  async getAppointment(id: string) {
    const response = await API.get<Appointment>(`/appointments/${id}`);
    return response.data;
  }

  async getAppointmentsByCompanyId() {
    const response = await API.get<Appointment[]>(`/appointments/company`);
    return response.data;
  }

  async createAppointment(appointment: Appointment) {
    const response = await API.post<Appointment>("/appointments", appointment);
    return response.data;
  }

  async updateAppointment(id: string, appointment: Appointment) {
    const response = await API.put<Appointment>(
      `/appointments/${id}`,
      appointment
    );
    return response.data;
  }
}

export default new AppointmentsService();
