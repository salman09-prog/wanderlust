
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { blogs } from '@/constants/blogs';

const BlogPage = () => {
  return (
    <Layout>
      <div className="bg-black py-12 md:py-16 min-h-screen border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Travel Blog
            </h1>
            <p className="text-zinc-400">
              Discover travel stories, tips, and insights from our adventures across incredible India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card key={blog.id} className="bg-zinc-900/40 backdrop-blur-md border border-white/10 shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20">
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
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
