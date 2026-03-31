
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ReviewFormProps {
  onClose: () => void;
  destinationId?: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onClose, destinationId }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !location || !comment || rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields and provide a rating.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would send the data to a server
    toast({
      title: "Thank You for Your Review!",
      description: "Your feedback has been submitted successfully and will be reviewed by our team.",
      variant: "default",
    });
    
    // Close the form
    onClose();
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-india-blue mb-6">
        {destinationId ? "Review This Destination" : "Share Your Experience"}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name*
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location*
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Rating*
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none mr-1"
              >
                <StarIcon
                  size={24}
                  className={`${
                    star <= (hoveredRating || rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review*
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with us..."
            rows={4}
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-india-saffron hover:bg-india-saffron/90 text-white"
          >
            Submit Review
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReviewForm;
