import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar, Clock, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { useListSessions, useCreateBooking } from "@workspace/api-client-react";
import type { SessionType } from "@workspace/api-client-react";

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time is required"),
  numberOfPeople: z.coerce.number().min(1, "At least 1 person"),
  specialRequests: z.string().optional()
});

type BookingForm = z.infer<typeof bookingSchema>;

const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];

export default function Booking() {
  const { data: sessions, isLoading: sessionsLoading } = useListSessions();
  const createBookingMutation = useCreateBooking();
  
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      numberOfPeople: 1
    }
  });

  const selectedDate = watch("date");
  const selectedTime = watch("timeSlot");

  const onSubmit = async (data: BookingForm) => {
    if (!selectedSession) return;
    try {
      await createBookingMutation.mutateAsync({
        data: {
          ...data,
          sessionTypeId: selectedSession.id
        }
      });
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card max-w-xl w-full rounded-[2rem] p-12 text-center shadow-2xl border border-border"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for booking with Mah Jenn! Jenn will be in touch shortly with all the details for your upcoming session.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary pt-20 pb-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Schedule Your Experience</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Select an offering below to begin planning your perfect mahjong event.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Session Selection */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-bold text-2xl px-2">1. Choose a Session</h3>
            
            {sessionsLoading ? (
              <div className="space-y-4">
                {[1,2,3].map(n => <div key={n} className="h-32 bg-muted animate-pulse rounded-2xl"></div>)}
              </div>
            ) : sessions?.map((session) => (
              <div 
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  selectedSession?.id === session.id 
                    ? "border-primary bg-primary/5 shadow-lg" 
                    : session.category === "package"
                    ? "border-primary/40 bg-primary/[0.03] hover:border-primary/60 hover:shadow-md"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-md"
                }`}
              >
                {session.category === "package" && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow">
                    🎉 Save 20%
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold text-secondary uppercase tracking-wider">{session.category}</div>
                  <div className="font-bold text-lg text-primary">${(session.priceInCents / 100).toFixed(2)}</div>
                </div>
                <h4 className="text-xl font-bold mb-2">{session.name}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{session.description}</p>
                <div className="flex items-center gap-4 text-xs font-semibold text-foreground/70">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {session.durationMinutes} min / session</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Up to {session.maxParticipants} ppl</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <div className={`bg-card rounded-[2rem] border border-border p-8 md:p-10 shadow-xl transition-all duration-500 ${!selectedSession ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
              {!selectedSession ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <ChevronRight className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Select a session first</h3>
                  <p className="text-muted-foreground">Choose one of the offerings on the left to proceed with booking.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div>
                    <h3 className="font-bold text-2xl mb-6">2. Date & Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground/80 flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> Select Date
                        </label>
                        <input 
                          type="date" 
                          min={format(new Date(), 'yyyy-MM-dd')}
                          {...register("date")} 
                          className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:ring-0 bg-background text-foreground text-lg outline-none transition-all" 
                        />
                        {errors.date && <span className="text-xs text-destructive mt-1 block">{errors.date.message}</span>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground/80 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Select Time
                        </label>
                        <select 
                          {...register("timeSlot")} 
                          className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:ring-0 bg-background text-foreground text-lg outline-none transition-all appearance-none"
                        >
                          <option value="">Choose a time...</option>
                          {TIME_SLOTS.map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                        {errors.timeSlot && <span className="text-xs text-destructive mt-1 block">{errors.timeSlot.message}</span>}
                      </div>
                    </div>
                  </div>

                  <hr className="border-border" />

                  <div>
                    <h3 className="font-bold text-2xl mb-6">3. Your Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <input placeholder="First Name" {...register("firstName")} className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background transition-all" />
                        {errors.firstName && <span className="text-xs text-destructive mt-1 block">{errors.firstName.message}</span>}
                      </div>
                      <div>
                        <input placeholder="Last Name" {...register("lastName")} className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background transition-all" />
                        {errors.lastName && <span className="text-xs text-destructive mt-1 block">{errors.lastName.message}</span>}
                      </div>
                      <div>
                        <input type="email" placeholder="Email Address" {...register("email")} className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background transition-all" />
                        {errors.email && <span className="text-xs text-destructive mt-1 block">{errors.email.message}</span>}
                      </div>
                      <div>
                        <input type="tel" placeholder="Phone Number" {...register("phone")} className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background transition-all" />
                      </div>
                    </div>
                    
                    <div className="mt-5">
                      <label className="block text-sm font-medium mb-2 text-foreground/80">Number of Participants (Max {selectedSession.maxParticipants})</label>
                      <input 
                        type="number" 
                        min="1" 
                        max={selectedSession.maxParticipants}
                        {...register("numberOfPeople")} 
                        className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background transition-all" 
                      />
                      {errors.numberOfPeople && <span className="text-xs text-destructive mt-1 block">{errors.numberOfPeople.message}</span>}
                    </div>

                    <div className="mt-5">
                      <textarea 
                        placeholder="Any special requests or questions?" 
                        rows={3}
                        {...register("specialRequests")} 
                        className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none bg-background transition-all resize-none" 
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-bold text-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? "Confirming..." : `Confirm Booking - $${(selectedSession.priceInCents / 100).toFixed(2)}`}
                  </button>
                  
                  {createBookingMutation.isError && (
                    <p className="text-destructive text-center mt-4">Failed to complete booking. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
