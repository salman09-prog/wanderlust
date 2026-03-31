
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { blogs } from '@/constants/blogs';

const TravelBlogs = () => {
  // Display only 3 blogs on homepage
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <section className="py-16 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Travel Blog</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Discover travel stories, tips, and insights from our adventures across incredible India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog) => (
            <Card key={blog.id} className="bg-zinc-900/40 backdrop-blur-md border border-white/10 shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-white">
                  {blog.category}
                </span>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center text-zinc-500 mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span className="text-xs">{blog.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-zinc-400 mb-4 line-clamp-3">{blog.excerpt}</p>
                <Link to={`/blog/${blog.id}`} className="text-white hover:text-zinc-300 font-medium flex items-center">
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
              View All Blog Posts
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelBlogs;
