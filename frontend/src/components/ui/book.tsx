
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface BookProps {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  link: string;
}

export const Book: React.FC<{ book: BookProps }> = ({ book }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={book.image} 
          alt={book.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image if the provided image fails to load
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
          }}
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-lg font-bold text-india-blue mb-2">{book.title}</h3>
        <p className="text-gray-500 text-sm mb-3">By {book.author}</p>
        <p className="text-gray-700 text-sm">{book.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <a 
          href={book.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-india-saffron text-white px-4 py-2 rounded hover:bg-india-marigold transition-colors text-sm"
        >
          Read Online
        </a>
      </CardFooter>
    </Card>
  );
};
