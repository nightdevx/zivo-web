import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface UpcomingAppointmentsProps {
  className?: string
}

export function UpcomingAppointments({ className }: UpcomingAppointmentsProps) {
  const appointments = [
    {
      id: 1,
      client: "Ayşe Yılmaz",
      time: "10:00 - 11:30",
      service: "Saç Kesimi & Fön",
      confirmed: true,
      initials: "AY",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      client: "Mehmet Demir",
      time: "12:00 - 13:00",
      service: "Sakal Tıraşı",
      confirmed: true,
      initials: "MD",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      client: "Zeynep Kaya",
      time: "14:00 - 15:30",
      service: "Saç Boyama",
      confirmed: false,
      initials: "ZK",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      client: "Fatma Şahin",
      time: "16:00 - 17:30",
      service: "Manikür & Pedikür",
      confirmed: true,
      initials: "FŞ",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Today's schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={appointment.avatar} alt={appointment.client} />
                <AvatarFallback>{appointment.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">{appointment.client}</p>
                  {appointment.confirmed ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                      Confirmed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">
                      Pending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
              </div>
              <div className="text-sm font-medium">{appointment.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

