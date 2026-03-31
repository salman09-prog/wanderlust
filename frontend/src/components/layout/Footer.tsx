
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Youtube, Mail, MapPin, MessageCircle, Linkedin, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatType, setChatType] = useState<null | 'basic'>(null);
  const [messages, setMessages] = useState<{ type: 'user' | 'bot', content: string }[]>([
    { type: 'bot', content: "Hello! How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleChatOpen = () => {
    setIsChatOpen(true);
    setChatType(null);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setChatType(null);
    setMessages([{ type: 'bot', content: "Hello! How can I help you today?" }]);
  };

  const handleBasicChat = () => {
    setChatType('basic');
  };

  const handleAdvancedChat = () => {
    window.open('https://cutt.cx/wanderlust', '_blank');
    setIsChatOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simple response logic for basic questions
    setTimeout(() => {
      let response = "I'm not sure how to answer that. You can ask me about destinations, games, music, or basic site information.";

      const lowerCaseMessage = inputMessage.toLowerCase();

      if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello')) {
        response = "Hello! How can I help you with your travel plans today?";
      } else if (lowerCaseMessage.includes('destination') || lowerCaseMessage.includes('places')) {
        response = "We feature over 20 amazing destinations across India including Rajasthan, Kerala, Goa, and many more!";
      } else if (lowerCaseMessage.includes('music') || lowerCaseMessage.includes('songs')) {
        response = "Our music page features 50 wonderful songs that capture the essence of India. Visit our music page to explore them!";
      } else if (lowerCaseMessage.includes('game') || lowerCaseMessage.includes('play')) {
        response = "We have several fun games including 'Would You Rather', 'Guess the Flag', 'Guess the Language', and 'Pick a Trip' wheel!";
      } else if (lowerCaseMessage.includes('books') || lowerCaseMessage.includes('read')) {
        response = "Check out our book recommendations page for great travel and adventure related books!";
      } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach')) {
        response = "You can contact us through our contact page. Visit the Contact Us section to submit your inquiry.";
      } else if (lowerCaseMessage.includes('about')) {
        response = "Wanderlust Adventures is your ultimate guide to exploring India's diverse landscapes and rich cultural heritage.";
      }

      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 600);
  };

  // Function to handle search button click
  const handleSearchClick = () => {
    // Find the search trigger button in the navbar and click it
    document.querySelector<HTMLButtonElement>('[data-search-trigger="true"]')?.click();
  };

  return (
    <footer className="bg-black border-t border-white/10 text-white/80 pb-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 text-white">
              <img src="/logo.png" alt="Wanderlust Adventures" className="h-8 w-auto object-contain" />
              <span className="font-bold text-xl tracking-widest">
                Wanderlust Adventures
              </span>
            </Link>
            <p className="text-gray-300 mb-4">
              Discover the rich cultural heritage and breathtaking landscapes of incredible India with our curated travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/UJWALSINGH23" target="_blank" rel="noopener noreferrer" className="text-white hover:text-india-saffron transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtu.be/LGFX4Nccq9U?si=Uf4seCGq1UA_Qj7c" target="_blank" rel="noopener noreferrer" className="text-white hover:text-india-saffron transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ujwalsingh23" target="_blank" rel="noopener noreferrer" className="text-white hover:text-india-saffron transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-india-saffron transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-india-saffron transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/all-destinations" className="text-gray-300 hover:text-india-saffron transition-colors">All Destinations</Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-300 hover:text-india-saffron transition-colors">Books</Link>
              </li>
              <li>
                <Link to="/travel-quiz" className="text-gray-300 hover:text-india-saffron transition-colors">Travel Quiz</Link>
              </li>
              <li>
                <Link to="/pick-a-trip" className="text-gray-300 hover:text-india-saffron transition-colors">Pick a Trip</Link>
              </li>
              <li>
                <Link to="/music" className="text-gray-300 hover:text-india-saffron transition-colors">Music</Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-300 hover:text-india-saffron transition-colors">Games</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-india-saffron transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/download" className="text-gray-300 hover:text-india-saffron transition-colors">Download PDF</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-india-saffron transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-india-saffron transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/featured?category=Beach" className="text-gray-300 hover:text-india-saffron transition-colors">Beaches</Link>
              </li>
              <li>
                <Link to="/featured?category=Mountain" className="text-gray-300 hover:text-india-saffron transition-colors">Mountains</Link>
              </li>
              <li>
                <Link to="/featured?category=Historical" className="text-gray-300 hover:text-india-saffron transition-colors">Historical Sites</Link>
              </li>
              <li>
                <Link to="/featured?category=Spiritual" className="text-gray-300 hover:text-india-saffron transition-colors">Spiritual Journeys</Link>
              </li>
              <li>
                <Link to="/featured?category=Wildlife" className="text-gray-300 hover:text-india-saffron transition-colors">Wildlife</Link>
              </li>
              <li>
                <Link to="/featured?category=Adventure" className="text-gray-300 hover:text-india-saffron transition-colors">Adventure</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">
                  Mumbai, Maharashtra

                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ujwalsingh164@gmail.com/?view=cm&fs=1&to=ujwalsingh164@gmail.com" className="text-gray-300 hover:text-india-saffron transition-colors">
                  Email (Click here)
                </a>
              </li>
              <li className="flex items-center mt-4">
                <a href="https://www.linkedin.com/in/ujwalsingh23" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-india-saffron transition-colors">
                  <Linkedin className="mr-2 flex-shrink-0" size={18} />
                  Connect on LinkedIn
                </a>
              </li>
              <li className="flex items-center mt-4">
                <Link to="/contact" className="flex items-center text-gray-300 hover:text-india-saffron transition-colors">
                  <Mail className="mr-2 flex-shrink-0" size={18} />
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Wanderlust Adventures. All rights reserved.
          </p>
        </div>
      </div>

      {/* Fixed Search Button */}
      <Button
        onClick={handleSearchClick}
        className="fixed bottom-24 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full shadow-lg hover:bg-white/20 transition-colors z-40"
        size="icon"
        aria-label="Search"
      >
        <Search size={24} />
      </Button>

      {/* Chat Button - Fixed */}
      <Button
        onClick={handleChatOpen}
        className="fixed bottom-6 right-6 bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-white/90 transition-colors z-40"
        size="icon"
        aria-label="Chat with us"
      >
        <MessageCircle size={32} />
      </Button>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-zinc-950 rounded-lg shadow-2xl z-50 border border-white/10 text-white">
          <div className="flex items-center justify-between bg-zinc-900 border-b border-white/10 text-white p-3 rounded-t-lg">
            <h3 className="font-medium">Chat with Us</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={handleChatClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {chatType === null ? (
            <div className="p-6">
              <h4 className="text-center mb-4 font-medium">Choose Chat Type</h4>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleBasicChat}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10"
                >
                  Basic Chat
                </Button>
                <Button
                  onClick={handleAdvancedChat}
                  className="bg-white text-black hover:bg-white/90"
                >
                  Advanced AI Chat
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 h-80 overflow-y-auto bg-zinc-950">
                <div className="flex flex-col space-y-3">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`${msg.type === 'bot'
                        ? 'bg-zinc-800 self-start'
                        : 'bg-white text-black self-end'
                        } p-3 rounded-lg max-w-[80%]`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 border-t border-white/10">
                <form className="flex items-center" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 bg-zinc-900 border border-white/10 rounded-l-md focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-zinc-500"
                  />
                  <Button type="submit" className="rounded-l-none bg-white text-black hover:bg-white/90">Send</Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </footer>
  );
};

export default Footer;
