export interface Appointment {
  id: string;
  customer: {
    id: string;
    name: string;
    phone: string;
  };
  employee: {
    id: string;
    name: string;
  };
  campaign: {
    id: string;
    title: string;
  };
  status: string;
  start_time: string;
  end_time: string;
  created_at: string;
  services: {
    id: string;
    name: string;
  }[];
}
