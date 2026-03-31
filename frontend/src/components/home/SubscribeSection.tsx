
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Google Sheet script URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwOogeBxZW1oSwzc73sWvxavRe0EzVY9eGMXcm5laQ/dev';
      
      // Create form data to send
      const formData = new FormData();
      formData.append('email', email);
      formData.append('timestamp', new Date().toISOString());
      
      // Send data to Google Sheet
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // This is important for Google Apps Script
        body: formData
      });
      
      // Show success message (note: response will be opaque due to no-cors)
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      // Clear form
      setEmail('');
      
      // Also save to localStorage as backup
      const existingEmails = JSON.parse(localStorage.getItem('subscribers') || '[]');
      const updatedEmails = [...existingEmails, { email, date: new Date().toISOString() }];
      localStorage.setItem('subscribers', JSON.stringify(updatedEmails));
      
    } catch (error) {
      console.error('Error during subscription:', error);
      toast({
        title: "Subscription error",
        description: "There was a problem with your subscription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="subscribe" className="bg-india-blue py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-blue-100 mb-8">
            Stay updated with our latest travel deals, destination guides, and insider tips for exploring India.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 text-white placeholder:text-blue-200 border-white/20 focus:border-white"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-india-saffron hover:bg-india-marigold text-white font-medium"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <div className="mt-6">
            <p className="text-blue-200 text-sm mb-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
            <p className="text-blue-200 text-sm">
              Have questions? <Link to="/contact" className="text-india-saffron hover:text-india-marigold underline">Contact us</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
