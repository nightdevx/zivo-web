import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Service } from "@/lib/models/service.model";
import { Clock, Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface ServicesTableProps {
  category?: string;
  services: Service[];
}

export function ServicesTable({ category, services }: ServicesTableProps) {
  // Filter services by category if provided
  const filteredServices = category
    ? services.filter((service) => service.category === category)
    : services;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Service Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                {service.duration}
              </TableCell>
              <TableCell>{service.price} ₺</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`active-${service.id}`}
                    defaultChecked={service.isActive}
                  />
                  <span>{service.isActive ? "Active" : "Inactive"}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// // Dummy services data
// const services = [
//   {
//     id: 1,
//     name: "Saç Kesimi - Kadın",
//     category: "hair",
//     categoryDisplay: "Saç",
//     duration: "45 dk",
//     price: 250,
//     active: true,
//   },
//   {
//     id: 2,
//     name: "Saç Kesimi - Erkek",
//     category: "hair",
//     categoryDisplay: "Saç",
//     duration: "30 dk",
//     price: 150,
//     active: true,
//   },
//   {
//     id: 3,
//     name: "Saç Boyama",
//     category: "hair",
//     categoryDisplay: "Saç",
//     duration: "120 dk",
//     price: 600,
//     active: true,
//   },
//   {
//     id: 4,
//     name: "Fön",
//     category: "hair",
//     categoryDisplay: "Saç",
//     duration: "30 dk",
//     price: 150,
//     active: true,
//   },
//   {
//     id: 5,
//     name: "Balayage",
//     category: "hair",
//     categoryDisplay: "Saç",
//     duration: "180 dk",
//     price: 1200,
//     active: true,
//   },
//   {
//     id: 6,
//     name: "Saç Bakımı",
//     category: "hair",
//     categoryDisplay: "Saç",
//     duration: "60 dk",
//     price: 350,
//     active: true,
//   },
//   {
//     id: 7,
//     name: "Sakal Tıraşı",
//     category: "hair",
//     categoryDisplay: "Saç",
//     duration: "20 dk",
//     price: 100,
//     active: true,
//   },
//   {
//     id: 8,
//     name: "Manikür",
//     category: "nails",
//     categoryDisplay: "Tırnak",
//     duration: "45 dk",
//     price: 200,
//     active: true,
//   },
//   {
//     id: 9,
//     name: "Pedikür",
//     category: "nails",
//     categoryDisplay: "Tırnak",
//     duration: "60 dk",
//     price: 250,
//     active: true,
//   },
//   {
//     id: 10,
//     name: "Manikür & Pedikür",
//     category: "nails",
//     categoryDisplay: "Tırnak",
//     duration: "90 dk",
//     price: 400,
//     active: true,
//   },
//   {
//     id: 11,
//     name: "Yüz Bakımı",
//     category: "skincare",
//     categoryDisplay: "Cilt Bakımı",
//     duration: "60 dk",
//     price: 500,
//     active: true,
//   },
//   {
//     id: 12,
//     name: "Derin Temizleme",
//     category: "skincare",
//     categoryDisplay: "Cilt Bakımı",
//     duration: "75 dk",
//     price: 600,
//     active: true,
//   },
//   {
//     id: 13,
//     name: "Makyaj",
//     category: "other",
//     categoryDisplay: "Diğer",
//     duration: "60 dk",
//     price: 400,
//     active: false,
//   },
//   {
//     id: 14,
//     name: "Gelin Makyajı",
//     category: "other",
//     categoryDisplay: "Diğer",
//     duration: "120 dk",
//     price: 1500,
//     active: true,
//   },
// ];
