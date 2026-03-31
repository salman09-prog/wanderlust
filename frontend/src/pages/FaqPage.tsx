
import React from 'react';
import Layout from '@/components/layout/Layout';
import FaqAccordion from '@/components/faq/FaqAccordion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FaqPage = () => {
  return (
    <Layout>
      <div className="bg-black py-12 md:py-16 min-h-screen border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-zinc-400">
              Find answers to common questions about traveling in India with Wanderlust Adventures.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-zinc-900/50 border border-white/10 rounded-xl shadow-sm p-6 md:p-8">
            <FaqAccordion />
          </div>

          <div className="max-w-3xl mx-auto mt-10 p-6 bg-zinc-900/50 rounded-xl border border-white/10 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Still have questions?</h3>
            <p className="text-zinc-400 mb-5">
              If you couldn't find the answer to your question, please feel free to contact us directly.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/contact">
                <Button className="bg-white hover:bg-white/90 text-black">
                  Contact Us
                </Button>
              </Link>
              <a href="https://cutt.cx/wanderlust" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                  Chat With Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;
