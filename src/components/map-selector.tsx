import { useRef, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Libraries } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { MapPin, Locate } from "lucide-react";
import { toast } from "sonner";
import {
  useGetMyLocation,
  useUpdateMyLocation,
  useCreateLocation,
} from "@/lib/hooks/location.hook";
import { Location } from "@/lib/models/location.model";

declare global {
  interface Window {
    google: any;
  }
}

const libraries: Libraries = ["marker", "places"];

export default function EnhancedMapComponent() {
  const { data: myLocation } = useGetMyLocation();
  const { mutate: updateMyLocation } = useUpdateMyLocation();
  const { mutate: createLocation } = useCreateLocation();
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [address, setAddress] = useState<string>("");

  const defaultCenter = {
    lat: myLocation?.latitude ?? 39.9334,
    lng: myLocation?.longitude ?? 32.8597,
  };

  const createCustomMarker = (lat: number, lng: number, title: string) => {
    const pin = document.createElement("div");
    pin.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="w-2 h-2 bg-primary rotate-45 -mt-1"></div>
      </div>
    `;

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: { lat, lng },
      title,
      content: pin,
    });

    markerRef.current = marker;
  };

  const updateMarkerAndAddress = async (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng });
    }

    if (markerRef.current) {
      markerRef.current.position = new google.maps.LatLng(lat, lng);
    } else {
      createCustomMarker(lat, lng, "Selected Location");
    }

    setSelectedLocation({ lat, lng });

    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });

      setAddress(response.results[0]?.formatted_address || "Address not found");
    } catch (error) {
      console.error("Geocoding error:", error);
      setAddress("Error getting address");
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      updateMarkerAndAddress(lat, lng);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          updateMarkerAndAddress(lat, lng);
          if (mapRef.current) {
            mapRef.current.setZoom(15);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast("Location access denied", {
            description:
              "Please enable location access in your browser settings.",
          });
        }
      );
    } else {
      toast("Geolocation not supported", {
        description: "Your browser does not support geolocation.",
      });
    }
  };

  const confirmLocation = () => {
    if (selectedLocation && address) {
      const locationData: Location = {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        address,
      };

      if (myLocation) {
        updateMyLocation({ locationData });
      } else {
        createLocation(locationData);
      }

      toast("Location selected", {
        description: "Your location has been successfully updated.",
      });
    } else {
      toast("Please select a location", {
        description: "Click on the map to select a location.",
      });
    }
  };
  useEffect(() => {
    if (myLocation) {
      const { latitude, longitude, address } = myLocation;

      setSelectedLocation({
        lat: latitude,
        lng: longitude,
      });
      setAddress(address);

      // Marker oluşturmayı geciktir
      setTimeout(() => {
        if (mapRef.current) {
          createCustomMarker(latitude, longitude, "My Location");
          mapRef.current.setCenter({ lat: latitude, lng: longitude });
        }
      }, 100); // 100ms gecikme
    }
  }, [myLocation]);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Button className="w-full" onClick={getUserLocation} variant="outline">
          <Locate className="h-4 w-4 mr-2" />
          Use My Location
        </Button>
      </div>

      <div className="flex-1 min-h-[400px] rounded-lg overflow-hidden shadow-lg border">
        <LoadScript
          libraries={libraries}
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            center={selectedLocation || defaultCenter}
            zoom={6}
            mapContainerClassName="w-full h-full"
            onClick={handleMapClick}
            onLoad={(map) => {
              mapRef.current = map;
              map.setOptions({
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              });
            }}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              scrollwheel: true,
              gestureHandling: "greedy",
              mapId: "47dd4d438b912651",
            }}
          />
        </LoadScript>
      </div>

      {selectedLocation && (
        <div className="p-3 bg-muted rounded-md flex items-start gap-2">
          <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">Selected Location</p>
            <p className="text-sm text-muted-foreground break-words">
              {address}
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              Lat: {selectedLocation.lat.toFixed(6)}, Lng:{" "}
              {selectedLocation.lng.toFixed(6)}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={confirmLocation} disabled={!selectedLocation}>
          Confirm Location
        </Button>
      </div>
    </div>
  );
}
