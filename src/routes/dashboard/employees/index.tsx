import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { createFileRoute } from "@tanstack/react-router";
import EditEmployeeForm from "@/components/employees/edit-employee-form";
import AddEmployeeForm from "@/components/employees/add-employee-form";
import EmployeeScheduleForm from "@/components/employees/employee-schedule-form";
import EmployeeCard from "@/components/employees/employee-card";
import EmployeeAppointmentsView from "@/components/employees/employee-appointments";
import { GetAllEmployeesQueryOptions } from "@/lib/hooks/employee.hook";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/employees/empty-employee";
import { GetAllServicesQueryOptions } from "@/lib/hooks/service.hook";

export const Route = createFileRoute("/dashboard/employees/")({
  component: EmployeesPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(GetAllEmployeesQueryOptions);
    queryClient.ensureQueryData(GetAllServicesQueryOptions);
  },
});

// Update the staffAppointments data to include multiple services for some appointments
const staffAppointments = {
  1: [
    {
      id: 101,
      date: "April 15, 2025",
      time: "10:00 - 11:30",
      customer: "Ayşe Yılmaz",
      service: "Haircut & Blow Dry",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 123 4567",
        email: "ayse@example.com",
        notes: "Needs special care for split ends.",
      },
    },
    {
      id: 102,
      date: "April 15, 2025",
      time: "13:00 - 14:30",
      customer: "Fatma Şahin",
      service: "Hair Coloring, Hair Treatment, Blow Dry",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 234 5678",
        email: "fatma@example.com",
        notes: "Prefers light brown tones.",
      },
    },
    {
      id: 103,
      date: "April 16, 2025",
      time: "11:00 - 12:00",
      customer: "Zeynep Kaya",
      service: "Blow Dry",
      status: "pending",
      customerInfo: {
        phone: "+90 555 345 6789",
        email: "zeynep@example.com",
        notes: "",
      },
    },
    {
      id: 104,
      date: "April 17, 2025",
      time: "14:00 - 15:30",
      customer: "Elif Demir",
      service: "Hair Treatment, Hair Mask, Blow Dry",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 456 7890",
        email: "elif@example.com",
        notes: "Complains about hair loss.",
      },
    },
  ],
  2: [
    {
      id: 201,
      date: "April 15, 2025",
      time: "09:30 - 10:00",
      customer: "Mehmet Demir",
      service: "Beard Trim",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 567 8901",
        email: "mehmet@example.com",
        notes: "Wants a square beard shape.",
      },
    },
    {
      id: 202,
      date: "April 15, 2025",
      time: "11:00 - 12:00",
      customer: "Ali Yıldız",
      service: "Men's Haircut, Beard Styling",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 678 9012",
        email: "ali@example.com",
        notes: "Short sides, long top.",
      },
    },
    {
      id: 203,
      date: "April 16, 2025",
      time: "10:00 - 10:30",
      customer: "Ahmet Kara",
      service: "Beard Trim",
      status: "pending",
      customerInfo: {
        phone: "+90 555 789 0123",
        email: "ahmet@example.com",
        notes: "",
      },
    },
  ],
  3: [
    {
      id: 301,
      date: "April 15, 2025",
      time: "10:00 - 11:00",
      customer: "Ayşe Yılmaz",
      service: "Manicure",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 123 4567",
        email: "ayse@example.com",
        notes: "Prefers pastel nail polish.",
      },
    },
    {
      id: 302,
      date: "April 15, 2025",
      time: "14:00 - 15:30",
      customer: "Zeynep Kaya",
      service: "Manicure & Pedicure, Nail Extensions",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 345 6789",
        email: "zeynep@example.com",
        notes: "Wants custom designs.",
      },
    },
    {
      id: 303,
      date: "April 16, 2025",
      time: "13:00 - 14:00",
      customer: "Fatma Şahin",
      service: "Nail Extensions",
      status: "pending",
      customerInfo: {
        phone: "+90 555 234 5678",
        email: "fatma@example.com",
        notes: "Prefers long oval nails.",
      },
    },
  ],
  4: [
    {
      id: 401,
      date: "April 18, 2025",
      time: "10:00 - 11:00",
      customer: "Zeynep Kaya",
      service: "Facial, Skin Cleaning, Mask Application",
      status: "confirmed",
      customerInfo: {
        phone: "+90 555 345 6789",
        email: "zeynep@example.com",
        notes: "Complains about dry skin.",
      },
    },
    {
      id: 402,
      date: "April 19, 2025",
      time: "14:00 - 15:00",
      customer: "Ayşe Yılmaz",
      service: "Skin Cleaning",
      status: "pending",
      customerInfo: {
        phone: "+90 555 123 4567",
        email: "ayse@example.com",
        notes: "Has acne problems.",
      },
    },
  ],
};

function EmployeesPage() {
  const employeeQuery = useSuspenseQuery(GetAllEmployeesQueryOptions);
  const employeeData = employeeQuery.data;

  const servicesQuery = useSuspenseQuery(GetAllServicesQueryOptions);
  const availableServices = servicesQuery.data.map((service: any) => ({
    value: service.id,
    label: service.name,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [selectedAppointments, setSelectedAppointments] = useState<any[]>([]);

  const filteredEmployee = employeeData.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateSchedule = (updatedSchedule: any) => {
    if (!selectedStaff) return;

    setIsScheduleOpen(false);
    toast("Schedule updated", {
      description: "Employee schedule successfully updated.",
    });
  };

  const handleViewAppointments = (member: any) => {
    setSelectedStaff(member);
    // Get appointments for this staff member
    const appointments =
      staffAppointments[member.id as keyof typeof staffAppointments] || [];
    setSelectedAppointments(appointments);
    setIsAppointmentsOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Employee Management</h1>

          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            {employeeData.length > 0 && (
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[600px]">
              <AddEmployeeForm
                onCancel={() => setIsAddStaffOpen(false)}
                availableServices={availableServices}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employee..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Employees</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="vacation">On Vacation</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {filteredEmployee.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEmployee.map((member) => (
                  <EmployeeCard
                    key={member.id}
                    member={member}
                    onSchedule={(member) => {
                      setSelectedStaff(member);
                      setIsScheduleOpen(true);
                    }}
                    onEdit={(member) => {
                      setSelectedStaff(member);
                      setIsEditStaffOpen(true);
                    }}
                    onViewAppointments={handleViewAppointments}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10">
                <EmptyState
                  onAddEmployee={() => {
                    setIsAddStaffOpen(true);
                  }}
                  filterActive={searchTerm.length > 0}
                  filterType={searchTerm.length > 0 ? "search" : ""}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            {filteredEmployee.filter((member) => member.status === "active")
              .length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEmployee
                  .filter((member) => member.status === "active")
                  .map((member) => (
                    <EmployeeCard
                      key={member.id}
                      member={member}
                      onSchedule={(member) => {
                        setSelectedStaff(member);
                        setIsScheduleOpen(true);
                      }}
                      onEdit={(member) => {
                        setSelectedStaff(member);
                        setIsEditStaffOpen(true);
                      }}
                      onViewAppointments={handleViewAppointments}
                    />
                  ))}
              </div>
            ) : (
              <div className="mt-10">
                <EmptyState
                  onAddEmployee={() => setIsAddStaffOpen(true)}
                  filterActive={true}
                  filterType="Active"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="vacation" className="mt-4">
            {filteredEmployee.filter((member) => member.status === "vacation")
              .length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEmployee
                  .filter((member) => member.status === "vacation")
                  .map((member) => (
                    <EmployeeCard
                      key={member.id}
                      member={member}
                      onSchedule={(member) => {
                        setSelectedStaff(member);
                        setIsScheduleOpen(true);
                      }}
                      onEdit={(member) => {
                        setSelectedStaff(member);
                        setIsEditStaffOpen(true);
                      }}
                      onViewAppointments={handleViewAppointments}
                    />
                  ))}
              </div>
            ) : (
              <div className="mt-10">
                <EmptyState
                  onAddEmployee={() => setIsAddStaffOpen(true)}
                  filterActive={true}
                  filterType="On Vacation"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Staff Schedule Dialog */}
        <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedStaff && (
              <EmployeeScheduleForm
                employee={selectedStaff}
                onSubmit={handleUpdateSchedule}
                onCancel={() => setIsScheduleOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Staff Dialog */}
        <Dialog open={isEditStaffOpen} onOpenChange={setIsEditStaffOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedStaff && (
              <EditEmployeeForm
                employee={selectedStaff}
                onCancel={() => setIsEditStaffOpen(false)}
                availableServices={availableServices}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Staff Appointments Dialog */}
        <Dialog open={isAppointmentsOpen} onOpenChange={setIsAppointmentsOpen}>
          <DialogContent className="sm:max-w-[800px]">
            {selectedStaff && (
              <EmployeeAppointmentsView
                staff={selectedStaff}
                appointments={selectedAppointments}
                onClose={() => setIsAppointmentsOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
