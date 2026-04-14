/*
 * Design philosophy for this file: Neo-Noir Terminal Luxe.
 * The application shell should stay minimal and let the single-page portfolio
 * carry the cinematic atmosphere without extra layout chrome.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster
            position="bottom-center"
            theme="dark"
            richColors
            toastOptions={{
              classNames: {
                toast: "font-mono border border-white/10 bg-black/80 text-white shadow-[0_12px_40px_rgba(0,0,0,0.4)]",
                success: "!border-[#00FF94]/40 !bg-[#00FF94] !text-[#111]",
                error: "!border-red-400/40 !bg-[#ff4d4d] !text-[#111]",
                title: "text-[0.95rem] font-bold uppercase tracking-[0.12em]",
                description: "text-[0.85rem] opacity-90",
              },
              duration: 3500,
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
