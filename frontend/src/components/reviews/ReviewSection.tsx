import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import API from '@/services/api';
import { Star, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Review {
    _id: string;
    userId: { _id: string; name: string };
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewSection({ tourId }: { tourId: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        fetchReviews();
    }, [tourId]);

    const fetchReviews = async () => {
        try {
            const res = await API.get(`/tours/${tourId}/reviews`);
            setReviews(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Must be logged in", description: "Please login to leave a review.", variant: "destructive" });
            return;
        }
        if (!comment.trim()) return;

        setSubmitting(true);
        try {
            await API.post(`/tours/${tourId}/reviews`, {
                userId: user._id,
                rating,
                comment
            });
            toast({ title: "Review submitted" });
            setComment('');
            setRating(5);
            fetchReviews();
        } catch (err) {
            toast({ title: "Failed to submit", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="py-10 animate-pulse bg-gray-100 h-40 rounded-xl"></div>;

    return (
        <div className="mt-16 pt-10 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8">Guest Reviews</h2>

            {/* Review Form */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-10">
                <h3 className="font-semibold text-white mb-4">Leave a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        size={24}
                                        className={`${star <= rating ? 'text-yellow-400 fill-current' : 'text-zinc-700'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience about this destination..."
                            className="w-full p-4 border border-white/20 bg-black/50 text-white placeholder:text-zinc-500 rounded-xl outline-none focus:border-white focus:ring-1 focus:ring-white min-h-[120px]"
                            required
                        ></textarea>
                    </div>
                    <Button
                        type="submit"
                        disabled={submitting || !comment.trim()}
                        className="bg-white hover:bg-white/90 text-black rounded-xl px-8"
                    >
                        {submitting ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                        Post Review
                    </Button>
                </form>
            </div>

            {/* Review List */}
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-zinc-500 italic">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="border-b border-white/10 pb-6">
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    {review.userId?.name?.charAt(0).toUpperCase() || <User size={18} />}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">{review.userId?.name || 'Anonymous User'}</h4>
                                    <p className="text-xs text-zinc-500">{new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="flex mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-zinc-700'}`} />
                                ))}
                            </div>
                            <p className="text-zinc-300 leading-relaxed">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
