import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import { z } from "zod";
import { useCreateOrder } from "@workspace/api-client-react";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const createOrderMutation = useCreateOrder();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = async (data: CheckoutForm) => {
    try {
      await createOrderMutation.mutateAsync({
        data: {
          ...data,
          items: items.map(item => ({ productId: item.id, quantity: item.quantity }))
        }
      });
      clearCart();
      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to checkout", err);
    }
  };

  const resetAndClose = () => {
    setIsCheckout(false);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[100]"
            onClick={resetAndClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-[101] flex flex-col border-l border-border"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {isSuccess ? "Order Confirmed" : isCheckout ? "Checkout" : "Your Cart"}
              </h2>
              <button
                onClick={resetAndClose}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold">Thank You!</h3>
                  <p className="text-muted-foreground">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
                  <button
                    onClick={resetAndClose}
                    className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-2" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button
                    onClick={resetAndClose}
                    className="text-primary font-semibold hover:underline"
                  >
                    Discover our collection
                  </button>
                </div>
              ) : isCheckout ? (
                <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input {...register("firstName")} className="w-full p-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-card" />
                      {errors.firstName && <span className="text-xs text-destructive mt-1">{errors.firstName.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input {...register("lastName")} className="w-full p-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-card" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" {...register("email")} className="w-full p-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-card" />
                    {errors.email && <span className="text-xs text-destructive mt-1">{errors.email.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input type="tel" {...register("phone")} className="w-full p-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-card" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Street Address</label>
                    <input {...register("address")} className="w-full p-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-card" />
                    {errors.address && <span className="text-xs text-destructive mt-1">{errors.address.message}</span>}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input {...register("city")} className="w-full p-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-card" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input {...register("state")} className="w-full p-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-card" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-1">Zip</label>
                      <input {...register("zipCode")} className="w-full p-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-card" />
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm">
                      <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-secondary">
                            <Flower2 className="w-8 h-8 opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-foreground leading-tight line-clamp-2">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-primary font-medium mt-1">
                            ${(item.priceInCents / 100).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted-foreground/20 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted-foreground/20 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isSuccess && items.length > 0 && (
              <div className="p-6 bg-card border-t border-border shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-foreground pt-3 border-t border-border">
                    <span>Total</span>
                    <span>${(subtotal / 100).toFixed(2)}</span>
                  </div>
                </div>

                {isCheckout ? (
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? "Processing..." : `Pay $${(subtotal / 100).toFixed(2)}`}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCheckout(true)}
                    className="w-full py-4 bg-foreground text-background rounded-xl font-bold shadow-lg hover:bg-foreground/90 transition-all flex justify-center items-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                
                {isCheckout && (
                  <button
                    onClick={() => setIsCheckout(false)}
                    className="w-full py-3 mt-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Back to Cart
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
