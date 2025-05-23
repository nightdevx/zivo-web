import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GetMyCompanyQueryOptions,
  useUpdateMyCompany,
} from "@/lib/hooks/companies.hook";
import { GetMyUserQueryOptions, useUpdateUser } from "@/lib/hooks/users.hook";
import { useGetMyLocation } from "@/lib/hooks/location.hook";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Company,
  CompanyInsert,
  CompanyUpdate,
} from "@/lib/models/companies.model";
import { User, UserUpdate } from "@/lib/models/users.model";
import { useState } from "react";

import UserTab from "@/components/profile/user-tab";
import BusinessTab from "@/components/profile/business-tab";
import BrandingTab from "@/components/profile/branding-tab";

import { Location } from "@/lib/models/location.model";

// import MapPopup from "@/components/map-component";

export const Route = createFileRoute("/dashboard/profile/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(GetMyUserQueryOptions);
    queryClient.ensureQueryData(GetMyCompanyQueryOptions);
  },
  component: ProfilePage,
});

// Define validation schemas
const userFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  phone: z.string().nullable().optional(),
});

const companyFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Business name must be at least 2 characters.",
    })
    .optional(),
  category: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  instagram_url: z.string().optional().nullable(),
  facebook_url: z.string().optional().nullable(),
  tiktok_url: z.string().optional().nullable(),
  youtube_url: z.string().optional().nullable(),
  x_url: z.string().optional().nullable(),
});

export default function ProfilePage() {
  const userQuery = useSuspenseQuery(GetMyUserQueryOptions);
  const userData: User = userQuery.data;

  const companyQuery = useSuspenseQuery(GetMyCompanyQueryOptions);
  const companyData: Company & {
    cover_image_url: string;
    logo_url: string;
  } = companyQuery.data;

  // const locationQuery = useSuspenseQuery(GetMyLocationQueryOptions);
  // const locationData: Location = locationQuery.data ?? {
  //   id: 0,
  //   address: "",
  //   latitude: 0,
  //   longitude: 0,
  // };
  // console.log("locationData", locationData);
  const { data: locationData } = useGetMyLocation();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    locationData
      ? {
          id: locationData.id,
          address: locationData.address,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        }
      : null
  );

  const userForm = useForm<UserUpdate>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: userData.email,
    },
  });

  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: companyData?.name ?? "",
      category: companyData?.category ?? "",
      description: companyData?.description ?? "",
      phone_number: companyData?.phone_number ?? "",
      website: companyData?.website ?? "",
      instagram_url: companyData?.instagram_url ?? "",
      facebook_url: companyData?.facebook_url ?? "",
      tiktok_url: companyData?.tiktok_url ?? "",
      youtube_url: companyData?.youtube_url ?? "",
      x_url: companyData?.x_url ?? "",
    },
  });

  const updateUser = useUpdateUser();
  const updateCompany = useUpdateMyCompany();

  function onUserSubmit(data: UserUpdate) {
    updateUser.mutate(
      { id: userData?.id ?? 0, userData: data },
      {
        onSuccess: () => {
          toast("User information updated", {
            description: "Your user information has been successfully updated.",
          });
        },
        onError: () => {
          toast("Error", {
            description: "Failed to update user information. Please try again.",
          });
        },
      }
    );
  }

  function onCompanySubmit(data: CompanyInsert | CompanyUpdate) {
    console.log("onCompanySubmit", data);
    updateCompany.mutate(
      { companyData: data },
      {
        onSuccess: () => {
          toast("Business information updated", {
            description:
              "Your business information has been successfully updated.",
          });
        },
        onError: () => {
          toast("Error", {
            description:
              "Failed to update business information. Please try again.",
          });
        },
      }
    );
  }

  const handlePlaceSelected = (place: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setIsPopupOpen(false);
    setSelectedLocation({
      address: place.address,
      latitude: place.lat,
      longitude: place.lng,
    });
  };

  // Check if userData and companyData are defined
  if (!userData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Unable to load your profile information. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        <Tabs defaultValue="user">
          <TabsList>
            <TabsTrigger value="user">User Information</TabsTrigger>
            <TabsTrigger value="company">Business Information</TabsTrigger>
            <TabsTrigger value="branding">Appearance</TabsTrigger>
          </TabsList>

          <UserTab onUserSubmit={onUserSubmit} userForm={userForm} />

          <BusinessTab
            location={selectedLocation || undefined}
            companyForm={companyForm}
            onCompanySubmit={onCompanySubmit}
            handlePlaceSelected={handlePlaceSelected}
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
          />
          <BrandingTab
            initialCoverImageUrl={companyData.cover_image_url}
            initialLogoUrl={companyData.logo_url}
          />
        </Tabs>
      </main>
    </div>
  );
}
