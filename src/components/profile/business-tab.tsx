import { Link } from "@tanstack/react-router";
import { CircleAlert } from "lucide-react";
import MapPopup from "@/components/location-popup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Location } from "@/lib/models/location.model";

interface BusinessTabProps {
  companyForm: any;
  location?: Location;
  onCompanySubmit: (data: any) => void;
  handlePlaceSelected: (place: any) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (open: boolean) => void;
}

const BusinessTab: React.FC<BusinessTabProps> = ({
  companyForm,
  location,
  onCompanySubmit,
  handlePlaceSelected,
  isPopupOpen,
  setIsPopupOpen,
}) => {
  return (
    <TabsContent value="company">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Update your business information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...companyForm}>
            <form
              onSubmit={companyForm.handleSubmit(onCompanySubmit)}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-4 flex-1">
                    <FormField
                      control={companyForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beauty_salon">
                                Beauty Salon
                              </SelectItem>
                              <SelectItem value="hair_salon">
                                Hair Salon
                              </SelectItem>
                              <SelectItem value="barber">Barber</SelectItem>
                              <SelectItem value="nail_salon">
                                Nail Care
                              </SelectItem>
                              <SelectItem value="spa">Spa & Massage</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-bold mb-2">Location</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add your business location to help customers find you
                      easily.
                    </p>
                    <div className="flex items-center gap-2 ">
                      <MapPopup
                      selectedLocation={
                        location
                        ? {
                          address: location.address,
                          latitude: location.latitude ,
                          longitude: location.longitude ,
                          }
                        : undefined
                      }
                      onPlaceSelected={handlePlaceSelected}
                      open={isPopupOpen}
                      setOpen={setIsPopupOpen}
                      />
                      <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                        <CircleAlert size={26} />
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>
                          If you pinpoint the exact location on the map, it
                          will be displayed on the map within the app,
                          making it easier for users to find you.
                        </p>
                        </TooltipContent>
                      </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                <FormField
                  control={companyForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your business"
                          className="resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        This description will be shown to your customers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={companyForm.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-bold mb-2">Socials</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add your social media links to help customers find you
                    easily.
                  </p>
                  <FormField
                    control={companyForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="instagram_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input placeholder="Instagram URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="facebook_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input placeholder="Facebook URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="tiktok_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TikTok</FormLabel>
                        <FormControl>
                          <Input placeholder="TikTok URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="youtube_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube</FormLabel>
                        <FormControl>
                          <Input placeholder="YouTube URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="twitter_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input placeholder="Twitter URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Working Hours</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You can edit your working hours from the "Working Hours"
                      page.
                    </p>
                    <Button variant="outline" type="button" asChild>
                      <Link to="/dashboard/hours">Edit Working Hours</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BusinessTab;
