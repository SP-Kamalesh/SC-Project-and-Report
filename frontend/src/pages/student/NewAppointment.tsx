
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, Video, MessageSquare } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  counselor: z.string().min(1, { message: "Please select a counselor" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, { message: "Please select a time" }),
  sessionType: z.enum(["video", "chat"], {
    required_error: "Please select a session type",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock counselor data
const counselors = [
  {
    id: "c1",
    name: "Dr. Sarah Johnson",
    specialty: "Academic Stress, Anxiety",
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "c2",
    name: "Dr. Michael Chen",
    specialty: "Career Guidance, Personal Development",
    availability: ["10:30", "11:30", "13:30", "14:30"],
  },
  {
    id: "c3",
    name: "Dr. Emily Rodriguez",
    specialty: "Mental Health, Relationships",
    availability: ["09:30", "11:00", "13:00", "15:30"],
  },
];

const NewAppointment = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedCounselor, setSelectedCounselor] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      counselor: "",
      sessionType: "video",
      notes: "",
    },
  });

  // Find available times for selected counselor and date
  const getAvailableTimes = () => {
    if (!selectedCounselor) return [];
    // In a real app, you would filter times based on the selected date
    return selectedCounselor.availability;
  };

  // Update selected counselor when form value changes
  React.useEffect(() => {
    const counselorId = form.watch("counselor");
    if (counselorId) {
      const found = counselors.find((c) => c.id === counselorId);
      setSelectedCounselor(found);
    } else {
      setSelectedCounselor(null);
    }
  }, [form.watch("counselor")]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your booking endpoint
      console.log("Booking form submitted:", values);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate successful booking
      toast({
        title: "Appointment scheduled",
        description: `Your session with ${selectedCounselor.name} has been booked for ${format(values.date, "MMMM d, yyyy")} at ${values.time}.`,
      });
      
      // Redirect to appointments page
      navigate("/appointments");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "There was an error scheduling your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedule a Session</h1>
        <p className="text-muted-foreground">
          Book a counselling appointment with one of our specialists
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Appointment</CardTitle>
              <CardDescription>
                Complete the form below to schedule your session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details">Session Details</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-6 pt-4">
                      <FormField
                        control={form.control}
                        name="counselor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Counselor</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a counselor" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {counselors.map((counselor) => (
                                  <SelectItem key={counselor.id} value={counselor.id}>
                                    <div>
                                      <span className="font-medium">{counselor.name}</span>
                                      <span className="text-muted-foreground text-xs ml-2 hidden md:inline-block">
                                        ({counselor.specialty})
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {selectedCounselor && (
                              <FormDescription>
                                Specializes in: {selectedCounselor.specialty}
                              </FormDescription>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                      disabled={isLoading}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    disabled={(date) => {
                                      // Disable past dates and weekends in this example
                                      return (
                                        date < new Date() ||
                                        date.getDay() === 0 ||
                                        date.getDay() === 6
                                      );
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!selectedCounselor || isLoading}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {getAvailableTimes().map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="preferences" className="space-y-6 pt-4">
                      <FormField
                        control={form.control}
                        name="sessionType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Type</FormLabel>
                            <div className="grid grid-cols-2 gap-4">
                              <div 
                                className={cn(
                                  "flex flex-col items-center gap-2 rounded-lg border border-muted p-4 hover:border-accent cursor-pointer",
                                  field.value === "video" && "border-2 border-primary"
                                )}
                                onClick={() => form.setValue("sessionType", "video")}
                              >
                                <Video className="h-6 w-6 mb-1" />
                                <span className="text-sm font-medium">Video Call</span>
                                <span className="text-xs text-muted-foreground text-center">
                                  Face-to-face video counselling session
                                </span>
                              </div>
                              <div 
                                className={cn(
                                  "flex flex-col items-center gap-2 rounded-lg border border-muted p-4 hover:border-accent cursor-pointer",
                                  field.value === "chat" && "border-2 border-primary"
                                )}
                                onClick={() => form.setValue("sessionType", "chat")}
                              >
                                <MessageSquare className="h-6 w-6 mb-1" />
                                <span className="text-sm font-medium">Chat Session</span>
                                <span className="text-xs text-muted-foreground text-center">
                                  Text-based messaging consultation
                                </span>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share any specific concerns or topics you'd like to discuss..."
                                className="resize-none"
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormDescription>
                              This helps your counselor prepare for the session
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => navigate(-1)} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Scheduling..." : "Schedule Appointment"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Selected Counselor</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedCounselor ? selectedCounselor.name : "Please select a counselor"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Date & Time</h3>
                <p className="text-sm text-muted-foreground">
                  {form.watch("date") ? (
                    <>
                      {format(form.watch("date"), "MMMM d, yyyy")}
                      {form.watch("time") && ` at ${form.watch("time")}`}
                    </>
                  ) : (
                    "Please select date and time"
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Session Type</h3>
                <p className="text-sm text-muted-foreground">
                  {form.watch("sessionType") === "video" ? "Video Call" : "Chat Session"}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t p-4">
              <p className="text-sm text-muted-foreground mb-4">
                {form.watch("sessionType") === "video" 
                  ? "For video sessions, ensure you have a private space and a stable internet connection."
                  : "Chat sessions allow for text-based communication with your counselor."}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                You can cancel or reschedule up to 24 hours before your appointment.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
