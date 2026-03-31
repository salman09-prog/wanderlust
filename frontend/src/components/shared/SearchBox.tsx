
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Bookmark, Calendar, MessageSquare, Music, Film, Book } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { destinations, faqs } from '@/constants/destinations';

// Define search result types - updated 'movie' to 'movies' for consistency
type SearchResultType = 'destination' | 'faq' | 'blog' | 'gallery' | 'movies' | 'music' | 'book';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  type: SearchResultType;
  url: string;
}

interface SearchBoxProps {
  onClose?: () => void;
  className?: string;
}

// Comprehensive collection of content for searching
const blogPosts = [
  {
    id: "1",
    title: "Top 10 Hidden Gems in Southern India",
    excerpt: "Discover lesser-known destinations in South India",
    image: "https://images.unsplash.com/photo-1602015111052-a1c88d9e2552?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291dGglMjBpbmRpYXxlbnwwfHwwfHx8MA%3D",
  },
  {
    id: "2",
    title: "A Foodie's Guide to North Indian Street Food",
    excerpt: "Explore the vibrant street food scene of North India",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D",
  },
  {
    id: "3",
    title: "Monsoon Magic: Best Places to Visit During Rainy Season",
    excerpt: "Experience the beauty of India during the monsoon season",
    image: "https://images.unsplash.com/photo-1536195892759-c8a3c8e1945e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "4",
    title: "Sacred Rivers of India: A Spiritual Journey",
    excerpt: "Explore the holy rivers that have shaped India's cultural landscape",
    image: "https://images.unsplash.com/photo-1600100882863-5a1a6b081f49?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

// Expanded gallery items for searching
const galleryItems = [
  {
    id: "1",
    title: "Taj Mahal at sunrise",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "2",
    title: "Sunset at Palolem Beach, Goa",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "3",
    title: "Varanasi Ghats",
    category: "Spiritual",
    image: "https://images.unsplash.com/photo-1561361058-c24daad92558?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "4",
    title: "Spice Market in Kerala",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1625294047464-fa12baa068a7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

// Expanded list of songs for searching
const songItems = [
  {
    id: "1",
    title: "Jai Ho",
    artist: "A.R. Rahman",
    album: "Slumdog Millionaire",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    title: "Chaiyya Chaiyya",
    artist: "Sukhwinder Singh",
    album: "Dil Se",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "3",
    title: "Kabira",
    artist: "Arijit Singh",
    album: "Yeh Jawaani Hai Deewani",
    image: "https://images.unsplash.com/photo-1528283648649-33347faa5d9e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "4",
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    album: "Aashiqui 2",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "5",
    title: "Raabta",
    artist: "Pritam, Arijit Singh",
    album: "Agent Vinod",
    image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

// Expanded list of movies for searching
const movieItems = [
  {
    id: "1",
    title: "Lagaan",
    director: "Ashutosh Gowariker",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    title: "3 Idiots",
    director: "Rajkumar Hirani",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "3",
    title: "Dilwale Dulhania Le Jayenge",
    director: "Aditya Chopra",
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "4",
    title: "Dangal",
    director: "Nitesh Tiwari",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "5",
    title: "PK",
    director: "Rajkumar Hirani",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

// Expanded list of books for searching
const bookItems = [
  {
    id: "1",
    title: "The White Tiger",
    author: "Aravind Adiga",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    title: "A Suitable Boy",
    author: "Vikram Seth",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "3",
    title: "The God of Small Things",
    author: "Arundhati Roy",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "4",
    title: "Midnight's Children",
    author: "Salman Rushdie",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "5",
    title: "The Namesake",
    author: "Jhumpa Lahiri",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

const SearchBox: React.FC<SearchBoxProps> = ({ onClose, className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchResultType | 'all'>('all');
  const navigate = useNavigate();

  // Create unified search results
  useEffect(() => {
    if (searchTerm.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const term = searchTerm.toLowerCase();

    // Search destinations
    const destinationResults: SearchResult[] = destinations
      .filter(dest =>
        dest.name.toLowerCase().includes(term) ||
        dest.location.toLowerCase().includes(term) ||
        dest.category.toLowerCase().includes(term) ||
        dest.description.toLowerCase().includes(term)
      )
      .map(dest => ({
        id: dest.id,
        title: dest.name,
        subtitle: dest.location,
        image: dest.image,
        type: 'destination',
        url: `/destination/${dest.id}`
      }));

    // Search FAQs
    const faqResults: SearchResult[] = faqs
      .filter(faq =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term)
      )
      .map((faq, index) => ({
        id: `faq-${index}`,
        title: faq.question,
        subtitle: faq.answer.substring(0, 60) + '...',
        type: 'faq',
        url: `/faq#faq-${index}`
      }));

    // Search blog posts
    const blogResults: SearchResult[] = blogPosts
      .filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term)
      )
      .map(post => ({
        id: post.id,
        title: post.title,
        subtitle: post.excerpt,
        image: post.image,
        type: 'blog',
        url: `/blog/${post.id}`
      }));

    // Search gallery
    const galleryResults: SearchResult[] = galleryItems
      .filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      )
      .map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.category,
        image: item.image,
        type: 'gallery',
        url: `/gallery`
      }));

    // Search songs
    const songResults: SearchResult[] = songItems
      .filter(song =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        song.album.toLowerCase().includes(term)
      )
      .map(song => ({
        id: song.id,
        title: song.title,
        subtitle: `${song.artist} - ${song.album}`,
        image: song.image,
        type: 'music',
        url: `/music`
      }));

    // Search movies - fixed the type to 'movies'
    const movieResults: SearchResult[] = movieItems
      .filter(movie =>
        movie.title.toLowerCase().includes(term) ||
        movie.director.toLowerCase().includes(term)
      )
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        subtitle: `Director: ${movie.director}`,
        image: movie.image,
        type: 'movies',
        url: `/movies`
      }));

    // Search books
    const bookResults: SearchResult[] = bookItems
      .filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
      )
      .map(book => ({
        id: book.id,
        title: book.title,
        subtitle: `Author: ${book.author}`,
        image: book.image,
        type: 'book',
        url: `/books`
      }));

    // Combine all results
    const allResults = [
      ...destinationResults,
      ...faqResults,
      ...blogResults,
      ...galleryResults,
      ...songResults,
      ...movieResults,
      ...bookResults
    ];

    setSearchResults(allResults);
    setShowResults(true);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleSelectResult = (result: SearchResult) => {
    setShowResults(false);
    if (onClose) onClose();
    navigate(result.url);
  };

  // Filter results based on active tab
  const filteredResults = activeTab === 'all'
    ? searchResults
    : searchResults.filter(result => result.type === activeTab);

  // Get result counts by type
  const resultCounts = {
    all: searchResults.length,
    destination: searchResults.filter(r => r.type === 'destination').length,
    faq: searchResults.filter(r => r.type === 'faq').length,
    blog: searchResults.filter(r => r.type === 'blog').length,
    gallery: searchResults.filter(r => r.type === 'gallery').length,
    music: searchResults.filter(r => r.type === 'music').length,
    movies: searchResults.filter(r => r.type === 'movies').length, // Changed 'movie' to 'movies' to match type definition
    book: searchResults.filter(r => r.type === 'book').length,
  };

  // Get type icon
  const getTypeIcon = (type: SearchResultType) => {
    switch (type) {
      case 'destination':
        return <MapPin size={16} className="mr-1 text-india-blue" />;
      case 'faq':
        return <MessageSquare size={16} className="mr-1 text-india-green" />;
      case 'blog':
        return <Calendar size={16} className="mr-1 text-india-saffron" />;
      case 'gallery':
        return <Bookmark size={16} className="mr-1 text-purple-500" />;
      case 'music':
        return <Music size={16} className="mr-1 text-pink-500" />;
      case 'movies': // Updated case from 'movie' to 'movies'
        return <Film size={16} className="mr-1 text-amber-500" />;
      case 'book':
        return <Book size={16} className="mr-1 text-emerald-500" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search destinations, FAQs, blogs, songs, movies, books..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full border border-white/20 bg-black/50 text-white placeholder:text-zinc-500 focus:border-white focus:ring-1 focus:ring-white rounded-full transition-all"
          />
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-2"
          >
            <X size={18} />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 max-h-[70vh] overflow-hidden flex flex-col backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex items-center border-b border-white/10 px-2 overflow-x-auto scrollbar-hide">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center rounded-lg m-1 ${activeTab === 'all' ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              onClick={() => setActiveTab('all')}
            >
              All ({resultCounts.all})
            </Button>
            {resultCounts.destination > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center rounded-lg m-1 ${activeTab === 'destination' ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('destination')}
              >
                <MapPin size={16} className="mr-1" />
                Destinations ({resultCounts.destination})
              </Button>
            )}
            {resultCounts.faq > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center rounded-lg m-1 ${activeTab === 'faq' ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('faq')}
              >
                <MessageSquare size={16} className="mr-1" />
                FAQs ({resultCounts.faq})
              </Button>
            )}
            {resultCounts.blog > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center rounded-lg m-1 ${activeTab === 'blog' ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('blog')}
              >
                <Calendar size={16} className="mr-1" />
                Blog ({resultCounts.blog})
              </Button>
            )}
            {resultCounts.gallery > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center rounded-lg m-1 ${activeTab === 'gallery' ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('gallery')}
              >
                <Bookmark size={16} className="mr-1" />
                Gallery ({resultCounts.gallery})
              </Button>
            )}
            {resultCounts.music > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center rounded-lg m-1 ${activeTab === 'music' ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('music')}
              >
                <Music size={16} className="mr-1" />
                Music ({resultCounts.music})
              </Button>
            )}
            {resultCounts.movies > 0 && ( // Updated from 'movie' to 'movies'
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center rounded-lg m-1 ${activeTab === 'movies' ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('movies')}
              >
                <Film size={16} className="mr-1" />
                Movies ({resultCounts.movies}) {/* Updated from movie to movies */}
              </Button>
            )}
            {resultCounts.book > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center rounded-lg m-1 ${activeTab === 'book' ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('book')}
              >
                <Book size={16} className="mr-1" />
                Books ({resultCounts.book})
              </Button>
            )}
          </div>

          {/* Results List */}
          <div className="overflow-y-auto max-h-[500px] bg-black/50">
            {filteredResults.length > 0 ? (
              <div className="p-2">
                {filteredResults.map(result => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className="flex items-center p-3 cursor-pointer hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10"
                    onClick={() => handleSelectResult(result)}
                  >
                    {result.image ? (
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                        {getTypeIcon(result.type)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center mb-1">
                        {getTypeIcon(result.type)}
                        <span className="text-xs text-zinc-400 font-medium">
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </span>
                      </div>
                      <p className="font-semibold text-white text-lg leading-tight">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-sm text-zinc-400 mt-1 line-clamp-1">{result.subtitle}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-zinc-400">
                No results found for this category.
              </div>
            )}
          </div>
        </div>
      )}

      {showResults && searchResults.length === 0 && searchTerm.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 p-8 backdrop-blur-xl">
          <div className="text-center text-zinc-400">
            No results found matching "<span className="text-white">{searchTerm}</span>".
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
