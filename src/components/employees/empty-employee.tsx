import { UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddEmployee: () => void;
  filterActive?: boolean;
  filterType?: string;
}

export function EmptyState({
  onAddEmployee,
  filterActive = false,
  filterType = "",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Users className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No employees found</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {filterActive
          ? `There are no employees in the "${filterType}" category. Try another filter or add new employees.`
          : "You haven't added any employees to your system yet. Start by adding your first employee."}
      </p>
      <Button onClick={onAddEmployee} className="mt-6">
        <UserPlus className="mr-2 h-4 w-4" />
        Add Employee
      </Button>
    </div>
  );
}
