import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ReactLenis } from '@studio-freight/react-lenis';

import Index from "./pages/Index";
import FeaturedPage from "./pages/FeaturedPage";
import DestinationDetail from "./pages/DestinationDetail";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";

import ReviewsPage from "./pages/ReviewsPage";
import BlogPage from "./pages/BlogPage";
import GalleryPage from "./pages/GalleryPage";
import PickTripPage from "./pages/PickTripPage";
import MoviesPage from "./pages/MoviesPage";
import MusicPage from "./pages/MusicPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import GamesPage from "./pages/GamesPage";
import MoreGamesPage from "./pages/MoreGamesPage";
import DownloadPage from "./pages/DownloadPage";
import BooksPage from "./pages/BooksPage";
import TravelQuizPage from "./pages/TravelQuizPage";

import AdminSubscribersPage from "./pages/AdminSubscribersPage";
import Cancel from "./pages/Cancel";
import Destinations from "./pages/Destinations";
import Login from "./pages/Login";
import MyBookings from "./components/MyBookings";
import PaymentSuccess from "./components/PaymentSuccess";
import Register from "./components/Register";
import Success from "./components/Success";
import AllDestinationsPage from "./pages/AllDestinationsPage";

import SearchResults from "./pages/SearchResults";
import UserDashboard from "./pages/UserDashboard";
import FlightsPage from "./pages/FlightsPage";
import HotelsPage from "./pages/HotelsPage";
import SettingsPage from "./pages/SettingsPage";
import LoyaltyPage from "./pages/LoyaltyPage";

const queryClient = new QueryClient();

const App = () => (
  <ReactLenis root>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/all-destinations" element={<AllDestinationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/travel-quiz" element={<TravelQuizPage />} />
          <Route path="/pick-a-trip" element={<PickTripPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/more-games" element={<MoreGamesPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/admin/subscribers" element={<AdminSubscribersPage />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/destination" element={<Destinations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </ReactLenis>
);

export default App;
