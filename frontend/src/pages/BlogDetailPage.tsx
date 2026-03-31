
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { blogs, Blog } from '@/constants/blogs';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      const foundBlog = blogs.find(b => b.id === parseInt(id));
      if (foundBlog) {
        setBlog(foundBlog);
      }
    }
  }, [id]);

  if (!blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Blog post not found</h1>
          <p className="mt-4 mb-8 text-gray-600">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="text-india-blue hover:text-india-saffron">
            &larr; Back to all posts
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-black py-8 md:py-12 min-h-screen border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to all posts
            </Link>

            <div className="bg-zinc-900/50 border border-white/10 rounded-xl shadow-sm overflow-hidden">
              <div className="h-80 relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
                      {blog.category}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-white">{blog.title}</h1>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center space-x-4 text-sm text-zinc-400 mb-8">
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{blog.date}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-lg font-medium text-white mb-6">{blog.excerpt}</p>

                  {blog.content.map((paragraph, idx) => (
                    <p key={idx} className="mb-6 text-zinc-400 leading-relaxed text-lg">{paragraph}</p>
                  ))}
                </div>

                <div className="border-t border-white/10 mt-8 pt-8">
                  <h3 className="font-semibold text-white mb-4">Related Posts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {blogs
                      .filter(relatedBlog => relatedBlog.id !== blog.id && relatedBlog.category === blog.category)
                      .slice(0, 2)
                      .map(relatedBlog => (
                        <Link
                          key={relatedBlog.id}
                          to={`/blog/${relatedBlog.id}`}
                          className="flex items-start space-x-3 p-3 hover:bg-white/5 rounded-md transition-colors"
                        >
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={relatedBlog.image}
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-white line-clamp-2">{relatedBlog.title}</h4>
                            <p className="text-xs text-zinc-500 mt-1">{relatedBlog.date}</p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetailPage;
