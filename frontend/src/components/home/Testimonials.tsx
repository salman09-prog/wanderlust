
import React from 'react';
import { testimonials } from '@/constants/destinations';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-16 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Travelers Say</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Read about the experiences of travelers who explored India with Wanderlust Adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow bg-zinc-900/50 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex gap-4 items-center mb-4">
                  <Avatar className="ring-2 ring-white/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-white/10 text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-zinc-400">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size={16}
                      className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="text-zinc-300 italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
