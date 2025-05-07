import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import EnhancedMapComponent from "./map-selector";
import { Location } from "@/lib/models/location.model";

export default function MapPopup({
  selectedLocation,
  open,
  setOpen,
  onPlaceSelected,
}: {
  selectedLocation: Location | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onPlaceSelected: (location: Location) => void;
}) {
  const handleLocationSelect = (location: Location) => {
    onPlaceSelected(location); // Call the parent function with the selected location
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Select Location
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select a Location</DialogTitle>
          </DialogHeader>
          <div className="h-[600px]">
            <EnhancedMapComponent
              selectedPlace={selectedLocation ?? undefined} // Pass the selected location to the map component
              onLocationSelect={handleLocationSelect} // Pass the selected location to the parent component
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
