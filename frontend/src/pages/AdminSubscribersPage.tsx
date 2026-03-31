
import React from 'react';
import Layout from '@/components/layout/Layout';
import SubscribersList from '@/components/admin/SubscribersList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminSubscribersPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-india-blue mb-8">Admin Dashboard</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Newsletter Management</CardTitle>
              <CardDescription>
                View and manage your newsletter subscribers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600">
                This page displays all subscribers who have signed up for your newsletter.
                You can export the list as CSV for use in email marketing campaigns.
              </p>
            </CardContent>
          </Card>
          
          <SubscribersList />
        </div>
      </div>
    </Layout>
  );
};

export default AdminSubscribersPage;
