import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/hooks/use-cart";
import Layout from "@/components/layout";

import Home from "@/pages/home";
import About from "@/pages/about";
import Booking from "@/pages/booking";
import Store from "@/pages/store";
import League from "@/pages/league";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-black text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">This path hasn't been discovered yet.</p>
      <a href="/" className="px-6 py-3 bg-foreground text-background rounded-xl font-semibold">
        Return to Safety
      </a>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/booking" component={Booking} />
      <Route path="/store" component={Store} />
      <Route path="/league" component={League} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
