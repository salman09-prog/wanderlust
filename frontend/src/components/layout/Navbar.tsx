import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Linkedin, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SearchBox from '@/components/shared/SearchBox';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Toggle search overlay
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-black/95 backdrop-blur-md shadow-sm py-4 border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white">
            <img src="/logo.png" alt="Wanderlust Adventures" className="h-8 w-auto object-contain" />
            <span className="hidden sm:block text-xl font-bold tracking-wider">Wanderlust Adventures</span>
          </Link>

          {isMobile ? (
            <>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={toggleSearch} data-search-trigger="true" className="text-white hover:bg-white/10">
                  <Search className="h-5 w-5" />
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[85%] sm:w-[385px]">
                    <nav className="flex flex-col space-y-4 mt-6">
                      <Link to="/" className="text-lg font-medium text-white hover:text-white/70">Home</Link>
                      <Link to="/flights" className="text-lg font-medium text-blue-400 hover:text-blue-300">✈ Flights</Link>
                      <Link to="/hotels" className="text-lg font-medium text-purple-400 hover:text-purple-300">🏨 Hotels</Link>
                      <Link to="/about" className="text-lg font-medium text-white hover:text-white/70">About</Link>
                      <Link to="/featured" className="text-lg font-medium text-white hover:text-white/70">Featured</Link>
                      <Link to="/blog" className="text-lg font-medium text-white hover:text-white/70">Blog</Link>
                      <Link to="/faq" className="text-lg font-medium text-white hover:text-white/70">FAQ</Link>
                      <Link to="/gallery" className="text-lg font-medium text-white hover:text-white/70">Gallery</Link>
                      <Link to="/contact" className="text-lg font-medium text-white hover:text-white/70">Contact</Link>

                      <div className="h-px bg-white/10 my-4" />

                      {user ? (
                        <>
                          <Link to="/dashboard" className="text-lg font-medium text-white hover:text-white/70">Dashboard</Link>
                          <Link to="/loyalty" className="text-lg font-medium text-amber-400 hover:text-amber-300">⭐ Loyalty & Rewards</Link>
                          <Link to="/settings" className="text-lg font-medium text-white hover:text-white/70">⚙️ Settings</Link>
                          <button onClick={handleLogout} className="text-left text-lg font-medium text-red-400 hover:text-red-500 flex items-center">
                            <LogOut className="mr-2 h-5 w-5" /> Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/login" className="text-lg font-medium text-white hover:text-white/70">Login</Link>
                          <Link to="/register" className="text-lg font-medium text-white hover:text-white/70">Register</Link>
                        </>
                      )}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                <Link to="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Home</Link>
                <Link to="/flights" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">✈ Flights</Link>
                <Link to="/hotels" className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">🏨 Hotels</Link>
                <Link to="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">About</Link>
                <Link to="/featured" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Featured</Link>
                <Link to="/blog" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Blog</Link>
                <Link to="/faq" className="text-sm font-medium text-white/80 hover:text-white transition-colors">FAQ</Link>
                <Link to="/gallery" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Gallery</Link>
                <Link to="/contact" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Contact</Link>
              </nav>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  data-search-trigger="true"
                  className="text-white hover:bg-white/10"
                >
                  <Search className="h-5 w-5" />
                </Button>

                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={handleLogout} className="text-white/80 hover:text-red-400 hover:bg-white/10">
                      Logout
                    </Button>
                    <Link to="/dashboard" className="flex items-center gap-2 ml-2 hover:opacity-80 transition-opacity">
                      <span className="text-sm font-medium text-white">Hello, {user.name || 'User'}!</span>
                      <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-white/10 flex items-center justify-center">
                        <UserIcon size={16} className="text-white" />
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="bg-white text-black hover:bg-white/90">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Search Overlay - Shown on both mobile and desktop */}
          {isSearchOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 shadow-2xl">
              <div className="bg-zinc-950 border border-white/10 p-4 sm:p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl font-semibold text-white">Search Destinations</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="text-white hover:bg-white/10">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <SearchBox onClose={() => setIsSearchOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
