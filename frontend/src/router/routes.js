import About from "../pages/About";
import ScrollToTop from "../utils/scrollToTop";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import ThankYou from "../pages/ThankYou";
import Tours from "../pages/Tours";
import Login from "../pages/Login";
import FAQ from "../components/FAQ";
import Gallery from "../pages/Gallery";
import SearchResultList from "../pages/SearchResultList";
import TourDetails from "../pages/TourDetails";
import BlogDetails from "../pages/BlogDetails";
import Blogs from "../pages/Blogs";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import AdminWrapper from "../components/admin/AdminWrapper";
import TourList from "../components/admin/Tours/TourList";
import AddTourPackage from "../components/admin/Tours/AddTourPackage";
import UpdateTour from "../components/admin/Tours/UpdateTour";
import Profile from "../components/Profile/ProfilePage";
import RatingsReviews from "../components/admin/Reviews/Reviews";
import UserProfile from "../components/Profile/UserProfile";
import Queries from "../pages/Queries";
import BlogPage from "../components/admin/Blogs/BlogPage";
import BlogCreate from "../components/admin/Blogs/BlogCreate";
import UsersTable from "../components/admin/Users/UserTable";
import Bookings from "../components/admin/Bookings/Bookings";
import ProfileWrapper from "../components/Profile/ProfileWrapper";
import CategoriesTags from "../components/admin/Categories";
import PaymentPageWithStripe from "../components/Booking/Payment";
export const publicRoutes = [
  { path: "/about", element: About },
  { path: "/contact", element: Contact },
  { path: "/", element: Home },
  { path: "/thankyou", element: ThankYou },
  { path: "*", element: PageNotFound },
  { path: "/tours", element: Tours },
  { path: "/tours/:id", element: TourDetails },
  { path: "/tours/:id/pay", element: PaymentPageWithStripe },
  { path: "/login", element: Login },
  { path: "/forgotpassword", element: ForgotPassword },
  { path: "/register", element: Register },
  { path: "/thank-you", element: ThankYou },
  { path: "/search", element: SearchResultList },
  { path: "/faq", element: FAQ },
  { path: "/gallery", element: Gallery },
  { path: "/blogs", element: Blogs },
  { path: "/blogs/:id", element: BlogDetails },
  { path: "/profile/:id", element: ProfileWrapper },
  { path: "/profile/:id/edit", element: Profile },
];

export const adminRoutes = [
  { path: "/admin", element: AdminWrapper },
  { path: "/admin/tours", element: TourList },
  { path: "/admin/tours/create", element: AddTourPackage },
  { path: "/admin/tours/update", element: UpdateTour },
  { path: "/admin/bookings", element: Bookings },
  { path: "/admin/queries", element: Queries },
  { path: "/admin/blogs", element: BlogPage },
  { path: "/admin/blog/create", element: BlogCreate },
  { path: "/admin/reviews", element: RatingsReviews },
  { path: "/admin/users", element: UsersTable },
  { path: "/admin/extras", element: CategoriesTags },
];
