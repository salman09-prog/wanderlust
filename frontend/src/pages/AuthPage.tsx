
import React from 'react';
import Layout from '@/components/layout/Layout';
import AuthForm from '@/components/auth/AuthForm';

const AuthPage = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12 bg-black flex items-center border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
            {/* Content */}
            <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome to Wanderlust Adventures</h1>
                <p className="text-zinc-400 mb-6">
                  Join our community of travel enthusiasts and gain access to exclusive deals, personalized recommendations, and seamless booking experiences for your Indian adventures.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-zinc-300">Access exclusive deals and discounts</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-zinc-300">Save your favorite destinations and itineraries</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-zinc-300">Receive personalized travel recommendations</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-zinc-300">Track your bookings and travel history</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Auth Form */}
            <div className="w-full md:w-1/2">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
