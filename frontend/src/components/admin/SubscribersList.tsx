
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Subscriber {
  email: string;
  date: string;
}

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    // Fetch subscribers from localStorage
    const savedSubscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    setSubscribers(savedSubscribers);
  }, []);

  const downloadCsv = () => {
    if (subscribers.length === 0) return;

    // Create CSV content
    const csvContent = [
      'Email,Date',
      ...subscribers.map(sub => `${sub.email},${new Date(sub.date).toLocaleString()}`)
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `subscribers_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-india-blue">Newsletter Subscribers</CardTitle>
        {subscribers.length > 0 && (
          <Button 
            onClick={downloadCsv} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export CSV
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {subscribers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No subscribers yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscription Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-6">
          Total subscribers: {subscribers.length}
        </p>
      </CardContent>
    </Card>
  );
};

export default SubscribersList;
