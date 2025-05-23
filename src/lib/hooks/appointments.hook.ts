import AppointmentsService from "../services/appointments.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: () => AppointmentsService.getAppointments(),
    select: (data) => {
      return data.map((appointment) => ({
        ...appointment,
        start_time: new Date(appointment.start_time),
      }));
    },
  });
};

export const useGetAppointmentsByCompanyId = () => {
  return useQuery({
    queryKey: ["appointmentsByCompanyId"],
    queryFn: () => AppointmentsService.getAppointmentsByCompanyId(),
    select: (data) => {
      return data.map((appointment) => ({
        ...appointment,
        start_time: new Date(appointment.start_time),
      }));
    },
  });
};
