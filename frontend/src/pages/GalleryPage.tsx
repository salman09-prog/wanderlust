
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Gallery categories
const categories = ["All", "Beaches", "Mountains", "Temples", "Wildlife", "Architecture", "Food", "Festivals", "People"];

// Gallery images
const galleryImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
    caption: "Taj Mahal at sunrise",
    category: "Architecture"
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D",
    caption: "Sunset at Palolem Beach, Goa",
    category: "Beaches"
  },
  {
    id: "3",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIrDhhIsppPo920zIAA16jSLuU0NvXZ74kJb7LqUudTcGYrgc77-You4_IAk7bQSUJNg&usqp=CAU",
    caption: "Golden Temple, Amritsar",
    category: "Temples"
  },
  {
    id: "4",
    src: "https://www.shutterstock.com/shutterstock/videos/1010566124/thumb/6.jpg?ip=x480",
    caption: "Majestic Himalayan peaks",
    category: "Mountains"
  },
  {
    id: "5",
    src: "https://cdn.britannica.com/20/189820-050-D650A54D/Red-Fort-Old-Delhi-India.jpg",
    caption: "Red Fort",
    category: "Wildlife"
  },
  {
    id: "6",
    src: "https://i.pinimg.com/736x/e8/d5/79/e8d57967fdd746057713d1f92009973e.jpg",
    caption: "Colorful Indian thali",
    category: "Food"
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D",
    caption: "Houseboats in Kerala backwaters",
    category: "Beaches"
  },
  {
    id: "8",
    src: "https://cdn.prod.website-files.com/66fee39c7a83b5fc8632159d/672decef813bfc2d1dabbff0_celebrating-colors-exploring-the-festival-of-holi-in-india.webp",
    caption: "Celebrating Holi festival",
    category: "Festivals"
  },
  {
    id: "9",
    src: "https://www.flamingotravels.net/_next/image?url=https%3A%2F%2Fimgcdn.flamingotravels.co.in%2FImages%2FCity%2FGanga-Aarti1.jpg&w=1920&q=90",
    caption: "Evening prayers by the Ganges, Varanasi",
    category: "People"
  },
  {
    id: "10",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2tqEfW7rNdwfBCKeLQM2H6v5vzYojvyccOg&s",
    caption: "Traditional Indian wedding",
    category: "Festivals"
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGphaXB1cnxlbnwwfHwwfHx8MA%3D",
    caption: "Hawa Mahal, Jaipur",
    category: "Architecture"
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuYWxpfGVufDB8fDB8fHww",
    caption: "Pine forests in Manali",
    category: "Mountains"
  },
  {
    id: "13",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbPohF994Osb2uw3Ou83MGf_SHi5FqRqXog&s",
    caption: "Elephants at Periyar Wildlife Sanctuary",
    category: "Wildlife"
  },
  {
    id: "14",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmF6qoAuY7YuFcYfUZKtX-ZLLhwRgtQTUk1A&s",
    caption: "Colorful spice market",
    category: "Food"
  },
  {
    id: "15",
    src: "https://img.etimg.com/thumb/msid-59822323,width-640,height-480,imgsize-437093,resizemode-4/jim-corbett-national-park-uttarakhand.jpg",
    caption: "National park Tigers",
    category: "People"
  },
  {
    id: "16",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDdtYHN1i97LlPYwkIoVDmR16rhs0fxHgcw&s",
    caption: "Ancient temple in Tamil Nadu",
    category: "Temples"
  },
  {
    id: "17",
    src: "https://media-cdn.tripadvisor.com/media/photo-s/13/ec/67/d4/crystal-clear-water-with.jpg",
    caption: "Crystal clear waters of Andaman Islands",
    category: "Beaches"
  },
  {
    id: "18",
    src: "https://www.jagranimages.com/images/newimg/09112023/09_11_2023-sdgg_31_23576554.jpg",
    caption: "Diwali celebrations with oil lamps",
    category: "Festivals"
  }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filter images based on active category
  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(image => image.category === activeCategory);

  // Handle image click for lightbox
  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <Layout>
      <div className="bg-black py-12 md:py-16 min-h-screen border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Travel Gallery
            </h1>
            <p className="text-zinc-400">
              Explore stunning visual inspiration from across India's diverse landscapes and cultures.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex overflow-x-auto py-4 mb-8 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-2 mx-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`rounded-full whitespace-nowrap transition-colors ${activeCategory === category
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent'
                    }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-lg group cursor-pointer h-64"
                onClick={() => handleImageClick(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{image.caption}</p>
                  <span className="text-xs bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full mt-2 inline-block">
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No images found for this category.</p>
            </div>
          )}

          {/* Lightbox */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" onClick={closeLightbox}>
              <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Gallery preview"
                  className="max-w-full max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                  onClick={closeLightbox}
                >
                  <X className="text-white" size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
