import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import MainRoutes from "./routes/routes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ListingProvider } from "./contexts/ListingContext";
import { BookingProvider } from "./contexts/BookingContext";

const App = () => (
  <>
    <BrowserRouter>
      <ProfileProvider>
        <ListingProvider>
          <BookingProvider>
            <Toaster />
            <Sonner position="top-center" />
            <MainRoutes />
          </BookingProvider>
        </ListingProvider>
      </ProfileProvider>
    </BrowserRouter>
  </>
);

export default App;
