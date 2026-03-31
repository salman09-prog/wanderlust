export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  category: string;
  detailDescription?: string;
  highlights?: string[];
  bestTimeToVisit?: string;
  thingsToDo?: string[];
  howToReach?: string;
  latitude?: number;
  longitude?: number;
  suitableFor: string; // Adding the missing property
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    description: "Explore the iconic symbol of eternal love, a UNESCO World Heritage site and one of the Seven Wonders of the World.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80",
    price: "₹1,500",
    rating: 4.3,
    category: "Historical",
    detailDescription: "The Taj Mahal, an ivory-white marble mausoleum on the southern bank of the river Yamuna in Agra, was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. The tomb is the centerpiece of a 17-hectare complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall. The construction project employed around 20,000 artisans under the guidance of a board of architects led by the court architect to the emperor, Ustad Ahmad Lahauri.",
    highlights: ["Marble architecture with intricate inlay work", "Symmetrical gardens and reflecting pool", "Sunrise and sunset views", "UNESCO World Heritage Site"],
    bestTimeToVisit: "October to March, when the weather is pleasant and ideal for exploring",
    thingsToDo: ["Guided heritage tour", "Photography at sunrise or sunset", "Visit nearby Agra Fort", "Explore local Mughlai cuisine"],
    howToReach: "Agra is well-connected by air, train and road. The nearest airport is Agra Airport, about 10 km from the Taj Mahal. You can also take a train to Agra Cantt Railway Station or drive from Delhi (230 km).",
    latitude: 27.1751,
    longitude: 78.0421,
    suitableFor: "Couple"
  },
  {
    id: "2",
    name: "Varanasi Ghats",
    location: "Varanasi, Uttar Pradesh",
    description: "Experience spiritual awakening at the ancient ghats along the sacred Ganges River with traditional evening ceremonies.",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80",
    price: "₹1,200",
    rating: 4.9,
    category: "Spiritual",
    detailDescription: "Varanasi, one of the oldest continuously inhabited cities in the world, is renowned for its ghats—steps leading down to the Ganges River. The city has about 88 ghats, most being bathing and puja ceremony ghats, while two are used exclusively as cremation sites. Every evening, the Ganga Aarti (ritual of offering prayer to the Ganges river) is performed at the Dashashwamedh Ghat, creating a mesmerizing spiritual ambiance with lamps, incense, flowers, and chants.",
    highlights: ["Evening Ganga Aarti ceremony", "Boat rides at sunrise", "Ancient temples", "Spiritual rituals and practices"],
    bestTimeToVisit: "November to February offers pleasant weather; Dev Deepawali in November is particularly special",
    thingsToDo: ["Attend evening Ganga Aarti", "Take a sunrise boat ride on the Ganges", "Explore narrow lanes and ancient temples", "Sample local street food specialties"],
    howToReach: "Varanasi is accessible by air (Lal Bahadur Shastri Airport), train (Varanasi Junction), and road. Several domestic flights connect Varanasi to major Indian cities.",
    latitude: 25.3176,
    longitude: 83.0062,
    suitableFor: "Family"
  },
  {
    id: "3",
    name: "Jaipur City Tour",
    location: "Jaipur, Rajasthan",
    description: "Discover the Pink City's majestic palaces, vibrant bazaars, and rich cultural heritage in the heart of Rajasthan.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80",
    price: "₹1,800",
    rating: 4.4,
    category: "Cultural",
    detailDescription: "Jaipur, the capital of Rajasthan, is known as the 'Pink City' due to the distinctive color of its buildings. Founded in 1727 by Maharaja Sawai Jai Singh II, it was one of the first planned cities in modern India. The city is renowned for its magnificent palaces, forts, and vibrant bazaars that showcase the rich cultural heritage and artistic traditions of Rajasthan. Jaipur forms part of the Golden Triangle tourist circuit along with Delhi and Agra.",
    highlights: ["Amber Fort and Palace", "Hawa Mahal (Palace of Winds)", "City Palace and Jantar Mantar", "Colorful bazaars with local handicrafts"],
    bestTimeToVisit: "October to March when the weather is pleasant and ideal for sightseeing",
    thingsToDo: ["Elephant ride to Amber Fort", "Shopping for handicrafts and textiles", "Experience traditional Rajasthani cuisine", "Attend cultural performances"],
    howToReach: "Jaipur International Airport connects to major Indian cities. Jaipur Junction railway station is well-connected to all major cities. National highways link Jaipur to nearby cities like Delhi (281 km).",
    latitude: 26.9124,
    longitude: 75.7873,
    suitableFor: "All"
  },
  {
    id: "4",
    name: "Goa Beach Retreat",
    location: "Goa",
    description: "Unwind at pristine beaches, enjoy water sports, and experience vibrant nightlife in India's favorite coastal paradise.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80",
    price: "₹2,500",
    rating: 4.5,
    category: "Beach",
    detailDescription: "Goa, India's smallest state on the southwestern coast, is famous for its pristine beaches, vibrant nightlife, and Portuguese-influenced architecture. The state is divided into North Goa, known for its lively atmosphere and popular beaches, and South Goa, which offers a more relaxed and serene experience. Beyond beaches, Goa boasts rich cultural heritage, historic churches, spice plantations, and delectable cuisine that blends Indian and Portuguese flavors.",
    highlights: ["Pristine beaches with golden sand", "Portuguese-era churches and architecture", "Vibrant nightlife and beach parties", "Water sports and adventure activities"],
    bestTimeToVisit: "November to February provides perfect beach weather without rain; December is festive with Christmas and New Year celebrations",
    thingsToDo: ["Relax on famous beaches like Baga, Calangute, or Palolem", "Try water sports like parasailing and jet-skiing", "Explore Old Goa's historic churches", "Experience the vibrant nightlife"],
    howToReach: "Dabolim Airport connects Goa to major Indian cities and some international destinations. Madgaon and Thivim are the major railway stations. Good road connectivity from Mumbai, Bangalore, and other cities.",
    latitude: 15.2993,
    longitude: 74.1240,
    suitableFor: "Couple and Friends"
  },
  {
    id: "5",
    name: "Kerala Backwaters",
    location: "Alleppey, Kerala",
    description: "Cruise through serene backwaters on traditional houseboats amidst coconut groves and paddy fields in God's own country.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80",
    price: "₹3,200",
    rating: 4.7,
    category: "Nature",
    detailDescription: "The Kerala Backwaters are a network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways. Alappuzha (Alleppey), known as the 'Venice of the East', is the hub of backwater tourism. Traditional houseboats, converted from old cargo-carrying vessels known as 'Kettuvallams', offer luxurious cruises through the palm-fringed waterways. The backwaters support unique ecosystem and a way of life that's closely tied to the water.",
    highlights: ["Overnight stay on traditional houseboats", "Scenic landscapes of coconut palms and paddy fields", "Village life along the waterways", "Rich birdlife and ecosystem"],
    bestTimeToVisit: "September to March, after the monsoon when the backwaters are clean and the weather is pleasant",
    thingsToDo: ["Overnight houseboat cruise with authentic Kerala meals", "Canoe rides through narrow canals", "Visit villages along the backwaters", "Ayurvedic spa treatments"],
    howToReach: "The nearest airport is Cochin International Airport (85 km from Alleppey). Alleppey has a railway station connected to major cities. Road connections are good from Kochi (55 km) and Trivandrum (160 km).",
    latitude: 9.4981,
    longitude: 76.3388,
    suitableFor: "Family"
  },
  {
    id: "6",
    name: "Darjeeling Tea Gardens",
    location: "Darjeeling, West Bengal",
    description: "Enjoy breathtaking Himalayan views, ride the historic toy train, and taste world-famous tea at picturesque plantations.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&fit=crop&q=80",
    price: "₹2,200",
    rating: 4.6,
    category: "Mountain",
    detailDescription: "Darjeeling, located in the Lesser Himalayas at an elevation of 2,000 meters, is renowned for its scenic beauty and distinctive black tea production. The town's landscape is dominated by tea plantations on the slopes, and it offers spectacular views of Kanchenjunga, the world's third-highest mountain. The Darjeeling Himalayan Railway, a UNESCO World Heritage Site, is a narrow-gauge railway that still operates steam locomotives, affectionately known as the 'Toy Train'.",
    highlights: ["Stunning views of Kanchenjunga", "Historic Darjeeling Himalayan Railway (Toy Train)", "Lush tea gardens and factory tours", "Colonial architecture and heritage"],
    bestTimeToVisit: "March to May for clear mountain views; September to November for pleasant post-monsoon weather",
    thingsToDo: ["Ride the historic 'toy train'", "Visit tea estates and taste authentic Darjeeling tea", "Sunrise view from Tiger Hill", "Visit Padmaja Naidu Himalayan Zoological Park"],
    howToReach: "The nearest airport is Bagdogra Airport (70 km), with connections to major Indian cities. New Jalpaiguri is the nearest major railway station. Shared jeeps and taxis connect Darjeeling to Siliguri and other nearby towns.",
    latitude: 27.0410,
    longitude: 88.2663,
    suitableFor: "All"
  },
  {
    id: "7",
    name: "Rann of Kutch",
    location: "Gujarat",
    description: "Experience the magical white salt desert, vibrant cultural performances, and traditional crafts at this seasonal marvel.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&fit=crop&q=80",
    price: "₹2,800",
    rating: 4.5,
    category: "Cultural",
    latitude: 23.8362,
    longitude: 69.5345,
    suitableFor: "Family"
  },
  {
    id: "8",
    name: "Khajuraho Temples",
    location: "Madhya Pradesh",
    description: "Marvel at the exquisite carvings and architectural brilliance of these UNESCO World Heritage temples from the Chandela dynasty.",
    image: "https://plus.unsplash.com/premium_photo-1697730370661-51bf72769ff6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹1,600",
    rating: 4.3,
    category: "Historical",
    latitude: 24.8318,
    longitude: 79.9199,
    suitableFor: "All"
  },
  {
    id: "9",
    name: "Andaman Islands",
    location: "Andaman and Nicobar Islands",
    description: "Discover pristine beaches, coral reefs, and marine life in these stunning islands known for crystal-clear waters and tropical forests.",
    image: "https://images.unsplash.com/photo-1715940093974-8836926f3f41?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹4,500",
    rating: 4.8,
    category: "Beach",
    latitude: 11.7401,
    longitude: 92.6586,
    suitableFor: "Couple and Friends"
  },
  {
    id: "10",
    name: "Hampi Ruins",
    location: "Karnataka",
    description: "Explore the magnificent ruins of the Vijayanagara Empire, with stunning boulder-strewn landscapes and ancient temple complexes.",
    image: "https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "₹1,400",
    rating: 4.4,
    category: "Historical",
    latitude: 15.3350,
    longitude: 76.4600,
    suitableFor: "All"
  },
  {
    id: "11",
    name: "Leh-Ladakh",
    location: "Ladakh",
    description: "Journey through the high-altitude desert landscape with ancient monasteries, crystal-clear lakes, and dramatic mountain passes.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&fit=crop&q=80",
    price: "₹3,800",
    rating: 4.9,
    category: "Adventure",
    latitude: 34.1526,
    longitude: 77.5771,
    suitableFor: "All"
  },
  {
    id: "12",
    name: "Coorg Coffee Plantations",
    location: "Karnataka",
    description: "Relax in the misty hills of this coffee kingdom, with lush plantations, cascading waterfalls, and vibrant local culture.",
    image: "https://images.unsplash.com/photo-1580289143685-ad698c0a71c3?w=800&fit=crop&q=80",
    price: "₹2,300",
    rating: 4.6,
    category: "Nature",
    latitude: 12.4244,
    longitude: 75.7382,
    suitableFor: "All"
  },
  {
    id: "13",
    name: "Ajanta and Ellora Caves",
    location: "Maharashtra",
    description: "Witness the artistic masterpieces of ancient India in these rock-cut cave monuments spanning Buddhist, Hindu and Jain religions.",
    image: "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800&fit=crop&q=80",
    price: "₹1,700",
    rating: 4.6,
    category: "Historical",
    latitude: 20.5519,
    longitude: 75.7000,
    suitableFor: "Family"
  },
  {
    id: "14",
    name: "Sundarbans",
    location: "West Bengal",
    description: "Navigate through the world's largest mangrove forest, spot the Royal Bengal tiger, and explore the unique ecosystem of this UNESCO site.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&fit=crop&q=80",
    price: "₹2,900",
    rating: 4.5,
    category: "Wildlife",
    latitude: 21.9497,
    longitude: 89.1833,
    suitableFor: "Adventures"
  },
  {
    id: "15",
    name: "Rishikesh",
    location: "Uttarakhand",
    description: "Find spiritual solace and adventure in this yoga capital, with the sacred Ganges river, suspension bridges, and Himalayan foothills.",
    image: "https://images.unsplash.com/photo-1591018533918-c2d7c52e3e2d?w=800&fit=crop&q=80",
    price: "₹1,900",
    rating: 4.7,
    category: "Spiritual",
    latitude: 30.0869,
    longitude: 78.2676,
    suitableFor: "Family"
  },
  {
    id: "16",
    name: "Ranthambore National Park",
    location: "Rajasthan",
    description: "Embark on thrilling tiger safaris in this former hunting ground of maharajas, now a premier wildlife reserve with ancient ruins.",
    image: "https://images.unsplash.com/photo-1560813962-ff3d8fcf59ba?w=800&fit=crop&q=80",
    price: "₹2,800",
    rating: 4.6,
    category: "Wildlife",
    latitude: 26.0173,
    longitude: 76.5026,
    suitableFor: "All"
  },
  {
    id: "17",
    name: "Shimla",
    location: "Himachal Pradesh",
    description: "Escape to the charming colonial atmosphere of this Himalayan hill station, with panoramic mountain views and pine-covered slopes.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&fit=crop&q=80",
    price: "₹2,100",
    rating: 4.8,
    category: "Mountain",
    latitude: 31.1048,
    longitude: 77.1734,
    suitableFor: "Couple"
  },
  {
    id: "18",
    name: "Mysore Palace",
    location: "Karnataka",
    description: "Be dazzled by the opulent Indo-Saracenic architecture of this royal residence, especially when illuminated by thousands of lights.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&fit=crop&q=80",
    price: "₹1,500",
    rating: 4.3,
    category: "Historical",
    latitude: 12.3052,
    longitude: 76.6551,
    suitableFor: "All"
  },
  {
    id: "19",
    name: "Munnar",
    location: "Kerala",
    description: "Wander through misty tea plantations, witness abundant wildlife, and enjoy cool mountain air in this picturesque hill station.",
    image: "https://images.unsplash.com/photo-1561721408-737f7b3d3b0c?w=800&fit=crop&q=80",
    price: "₹2,200",
    rating: 4.2,
    category: "Nature",
    latitude: 10.0889,
    longitude: 77.0595,
    suitableFor: "All"
  },
  {
    id: "20",
    name: "Kaziranga National Park",
    location: "Assam",
    description: "Encounter the majestic one-horned rhinoceros and explore diverse flora and fauna in this UNESCO World Heritage site.",
    image: "https://images.unsplash.com/photo-1549366021-9350e1c7db85?w=800&fit=crop&q=80",
    price: "₹2,500",
    rating: 4.6,
    category: "Wildlife",
    latitude: 26.5806,
    longitude: 93.1753,
    suitableFor: "Adventures"
  },
  {
    id: "21",
    name: "Valley of Flowers",
    location: "Uttarakhand",
    description: "Trek through a breathtaking alpine valley filled with endemic flowers, nestled in the Western Himalayas UNESCO site.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop&q=80",
    price: "₹2,800",
    rating: 4.9,
    category: "Adventure",
    latitude: 30.7283,
    longitude: 79.6244,
    suitableFor: "All"
  },
  {
    id: "22",
    name: "Kanyakumari",
    location: "Tamil Nadu",
    description: "Stand at the southernmost tip of mainland India where three oceans meet, and witness spectacular sunrise and sunset views.",
    image: "https://images.unsplash.com/photo-1609764046504-a188e7a78b7e?w=800&fit=crop&q=80",
    price: "₹1,800",
    rating: 4.5,
    category: "Cultural",
    latitude: 8.0883,
    longitude: 77.5385,
    suitableFor: "Family"
  },
  {
    id: "23",
    name: "Ooty",
    location: "Tamil Nadu",
    description: "Discover the 'Queen of Hill Stations' with its colonial charm, toy train, botanical gardens, and serene lake.",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&fit=crop&q=80",
    price: "₹2,000",
    rating: 4.6,
    category: "Mountain",
    latitude: 11.4102,
    longitude: 76.6950,
    suitableFor: "Couple"
  },
  {
    id: "24",
    name: "Konark Sun Temple",
    location: "Odisha",
    description: "Admire the architectural marvel designed as a colossal chariot with intricate stone carvings at this UNESCO site.",
    image: "https://images.unsplash.com/photo-1625731226041-b4e255fa0b59?w=800&fit=crop&q=80",
    price: "₹1,400",
    rating: 4.7,
    category: "Historical",
    latitude: 19.8876,
    longitude: 86.0945,
    suitableFor: "Family"
  },
  {
    id: "25",
    name: "Amritsar Golden Temple",
    location: "Punjab",
    description: "Visit the holiest Sikh gurdwara, shimmering in gold beside the sacred pool, known for its spiritual significance and langar service.",
    image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=800&fit=crop&q=80",
    price: "₹1,200",
    rating: 4.9,
    category: "Spiritual",
    latitude: 31.6200,
    longitude: 74.8765,
    suitableFor: "All"
  },
  {
    id: "26",
    name: "Jim Corbett National Park",
    location: "Uttarakhand",
    description: "Embark on jungle safaris in India's oldest national park, home to Bengal tigers, elephants, and diverse wildlife.",
    image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800&fit=crop&q=80",
    price: "₹2,600",
    rating: 4.6,
    category: "Wildlife",
    latitude: 29.5300,
    longitude: 78.7747,
    suitableFor: "Adventures"
  },
  {
    id: "27",
    name: "Kovalam Beach",
    location: "Kerala",
    description: "Relax on crescent-shaped beaches with lighthouse views, ayurvedic treatments, and fresh seafood in this tropical paradise.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&fit=crop&q=80",
    price: "₹2,300",
    rating: 4.5,
    category: "Beach",
    latitude: 8.3988,
    longitude: 76.9727,
    suitableFor: "All"
  },
  {
    id: "28",
    name: "Udaipur City Palace",
    location: "Rajasthan",
    description: "Experience royal heritage at this majestic palace complex overlooking Lake Pichola, with ornate architecture and museums.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&fit=crop&q=80",
    price: "₹1,900",
    rating: 4.5,
    category: "Cultural",
    latitude: 24.5765,
    longitude: 73.6823,
    suitableFor: "All"
  },
  {
    id: "29",
    name: "Khardung La Pass",
    location: "Ladakh",
    description: "Drive through one of the world's highest motorable passes with breathtaking Himalayan views and a sense of achievement.",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&fit=crop&q=80",
    price: "₹3,000",
    rating: 4.7,
    category: "Adventure",
    latitude: 34.2788,
    longitude: 77.6038,
    suitableFor: "Adventures"
  },
  {
    id: "30",
    name: "Haridwar",
    location: "Uttarakhand",
    description: "Witness spiritual devotion at this ancient holy city, with sacred ghats on the Ganges and the mesmerizing evening Ganga Aarti.",
    image: "https://images.unsplash.com/photo-1561095532-ac459779a4fc?w=800&fit=crop&q=80",
    price: "₹1,400",
    rating: 4.8,
    category: "Spiritual",
    latitude: 29.9457,
    longitude: 78.1642,
    suitableFor: "All"
  },
  {
    id: "31",
    name: "Ellora Caves",
    location: "Maharashtra",
    description: "Marvel at the rock-cut temple complex showcasing Hindu, Buddhist, and Jain monuments with stunning sculptures and architecture.",
    image: "https://images.unsplash.com/photo-1598187079701-b8733e304346?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWxsb3JhJTIwY2F2ZXN8ZW58MHx8MHx8fDA%3D",
    price: "₹1,600",
    rating: 4.9,
    category: "Historical",
    latitude: 20.0268,
    longitude: 75.1779,
    suitableFor: "All"
  },
  {
    id: "32",
    name: "Tawang Monastery",
    location: "Arunachal Pradesh",
    description: "Visit India's largest monastery with panoramic Himalayan views, rich Tibetan Buddhist heritage, and serene atmosphere.",
    image: "https://images.unsplash.com/photo-1624368919606-ef1407d6358c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGF3YW5nfGVufDB8fDB8fHww",
    price: "₹2,700",
    rating: 4.7,
    category: "Spiritual",
    latitude: 27.5874,
    longitude: 91.8588,
    suitableFor: "All"
  },
  {
    id: "33",
    name: "Meenakshi Temple",
    location: "Madurai, Tamil Nadu",
    description: "Explore one of India's most magnificent temples with towering gopurams, thousands of sculptures, and ancient Tamil architecture.",
    image: "https://images.unsplash.com/photo-1684641641866-6cf6eb9170e9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVlbmFrc2hpJTIwdGVtcGxlfGVufDB8fDB8fHww",
    price: "₹1,300",
    rating: 4.8,
    category: "Spiritual",
    latitude: 9.9195,
    longitude: 78.1193,
    suitableFor: "All"
  },
  {
    id: "34",
    name: "Elephanta Caves",
    location: "Mumbai, Maharashtra",
    description: "Take a boat trip to these ancient rock-cut caves on an island, featuring Lord Shiva sculptures and architectural marvels.",
    image: "https://images.unsplash.com/photo-1566159937755-3716efcdb892?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlcGhhbnRhJTIwY2F2ZXN8ZW58MHx8MHx8fDA%3D",
    price: "₹1,500",
    rating: 4.5,
    category: "Historical",
    latitude: 18.9634,
    longitude: 72.9311,
    suitableFor: "All"
  },
  {
    id: "35",
    name: "Spiti Valley",
    location: "Himachal Pradesh",
    description: "Journey through a high-altitude cold desert with stunning landscapes, ancient monasteries, and unique Himalayan culture.",
    image: "https://images.unsplash.com/photo-1611165338149-b4d24430773a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BpdGklMjB2YWxsZXl8ZW58MHx8MHx8fDA%3D",
    price: "₹3,200",
    rating: 4.9,
    category: "Adventure",
    latitude: 32.2458,
    longitude: 78.2344,
    suitableFor: "All"
  },
  {
    id: "36",
    name: "Mahabalipuram",
    location: "Tamil Nadu",
    description: "Discover ancient shore temples, rock-cut monuments, and stone chariots at this UNESCO World Heritage coastal site.",
    image: "https://images.unsplash.com/photo-1621136828100-b5de0e23c484?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFoYWJhbGlwdXJhbXxlbnwwfHwwfHx8MA%3D",
    price: "₹1,400",
    rating: 4.6,
    category: "Historical",
    latitude: 12.6269,
    longitude: 80.1927,
    suitableFor: "All"
  },
  {
    id: "37",
    name: "Palolem Beach",
    location: "Goa",
    description: "Relax on this picturesque crescent-shaped beach with calm waters, beach huts, and laid-back atmosphere in South Goa.",
    image: "https://images.unsplash.com/photo-1614593465990-b2808afc8637?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFsb2xlbSUyMGJlYWNofGVufDB8fDB8fHww",
    price: "₹2,200",
    rating: 4.7,
    category: "Beach",
    latitude: 15.0103,
    longitude: 74.0233,
    suitableFor: "All"
  },
  {
    id: "38",
    name: "Gir National Park",
    location: "Gujarat",
    description: "Encounter the majestic Asiatic lion in its only natural habitat left in the world, along with diverse wildlife.",
    image: "https://images.unsplash.com/photo-1598976988306-812abecc328c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lyJTIwbmF0aW9uYWwlMjBwYXJrfGVufDB8fDB8fHww",
    price: "₹2,500",
    rating: 4.6,
    category: "Wildlife",
    latitude: 21.1390,
    longitude: 70.8293,
    suitableFor: "All"
  },
  {
    id: "39",
    name: "Manali",
    location: "Himachal Pradesh",
    description: "Experience adventure sports, natural beauty, and vibrant culture in this charming hill station nestled in the Himalayas.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuYWxpfGVufDB8fDB8fHww",
    price: "₹2,400",
    rating: 4.7,
    category: "Mountain",
    latitude: 32.2432,
    longitude: 77.1892,
    suitableFor: "All"
  },
  {
    id: "40",
    name: "Mahabodhi Temple",
    location: "Bodh Gaya, Bihar",
    description: "Visit the sacred site where Buddha attained enlightenment, with ancient temple complex, Bodhi tree, and spiritual atmosphere.",
    image: "https://images.unsplash.com/photo-1657714272583-ef35e6f64f13?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFoYWJvZGhpJTIwdGVtcGxlfGVufDB8fDB8fHww",
    price: "₹1,300",
    rating: 4.8,
    category: "Spiritual",
    latitude: 24.6959,
    longitude: 84.9911,
    suitableFor: "All"
  },
  {
    id: "41",
    name: "Dudhsagar Falls",
    location: "Goa/Karnataka Border",
    description: "Trek to this magnificent four-tiered waterfall in the Western Ghats, offering spectacular views especially during monsoon.",
    image: "https://images.unsplash.com/photo-1570438395701-9562564549e8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVkaHNhZ2FyfGVufDB8fDB8fHww",
    price: "₹1,800",
    rating: 4.7,
    category: "Adventure",
    latitude: 15.3145,
    longitude: 74.3146,
    suitableFor: "All"
  },
  {
    id: "42",
    name: "Majuli Island",
    location: "Assam",
    description: "Experience the unique culture of the world's largest river island, with neo-Vaishnavite monasteries and tribal heritage.",
    image: "https://images.unsplash.com/photo-1615473787506-14f9d50f281d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFqdWxpfGVufDB8fDB8fHww",
    price: "₹2,100",
    rating: 4.6,
    category: "Cultural",
    latitude: 26.9499,
    longitude: 94.1667,
    suitableFor: "All"
  },
  {
    id: "43",
    name: "Pushkar",
    location: "Rajasthan",
    description: "Discover spiritual heritage at the sacred lake, Brahma Temple, and the famous annual camel fair in this pilgrimage town.",
    image: "https://images.unsplash.com/photo-1622279488880-70d77415a0c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVzaGthcnxlbnwwfHwwfHx8MA%3D",
    price: "₹1,600",
    rating: 4.5,
    category: "Spiritual",
    latitude: 26.4902,
    longitude: 74.5508,
    suitableFor: "All"
  },
  {
    id: "44",
    name: "Nubra Valley",
    location: "Ladakh",
    description: "Ride double-humped Bactrian camels in this high-altitude cold desert, with sand dunes, monasteries, and apricot orchards.",
    image: "https://images.unsplash.com/photo-1590620318565-5a7682c61ee2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bnVicmElMjB2YWxsZXl8ZW58MHx8MHx8fDA%3D",
    price: "₹3,500",
    rating: 4.8,
    category: "Adventure",
    latitude: 34.6938,
    longitude: 77.5598,
    suitableFor: "All"
  },
  {
    id: "45",
    name: "Kanha National Park",
    location: "Madhya Pradesh",
    description: "Explore the inspiration for Kipling's 'Jungle Book' with its tigers, lush sal forests, and diverse wildlife.",
    image: "https://images.unsplash.com/photo-1604608684575-0478ddb56d48?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FuaGElMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
    price: "₹2,700",
    rating: 4.7,
    category: "Wildlife",
    latitude: 22.2707,
    longitude: 80.6345,
    suitableFor: "All"
  },
  {
    id: "46",
    name: "Ziro Valley",
    location: "Arunachal Pradesh",
    description: "Immerse in the culture of the Apatani tribe, verdant rice fields, pine hills, and the famous music festival in this serene valley.",
    image: "https://images.unsplash.com/photo-1611605645252-86a5ccafeccc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8emlybyUyMHZhbGxleXxlbnwwfHwwfHx8MA%3D",
    price: "₹2,900",
    rating: 4.6,
    category: "Cultural",
    latitude: 27.5369,
    longitude: 93.8288,
    suitableFor: "All"
  },
  {
    id: "47",
    name: "Dhanushkodi",
    location: "Tamil Nadu",
    description: "Visit the ghost town at the southeasternmost tip of Pamban Island, with pristine beaches and mythological significance.",
    image: "https://images.unsplash.com/photo-1598238533739-3656a984bded?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGhhbnVzaGtvZGl8ZW58MHx8MHx8fDA%3D",
    price: "₹1,700",
    rating: 4.5,
    category: "Beach",
    latitude: 9.1550,
    longitude: 79.4183,
    suitableFor: "All"
  },
  {
    id: "48",
    name: "Bandipur National Park",
    location: "Karnataka",
    description: "Spot tigers, elephants and diverse wildlife in the lush forests of the Western Ghats in this important conservation center.",
    image: "https://images.unsplash.com/photo-1565953520963-c1d53b618b79?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFuZGlwdXIlMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
    price: "₹2,400",
    rating: 4.6,
    category: "Wildlife",
    latitude: 11.7671,
    longitude: 76.6353,
    suitableFor: "All"
  }
];

export const categories = [
  "All",
  "Beach",
  "Mountain",
  "Cultural",
  "Historical",
  "Spiritual",
  "Adventure",
  "Nature",
  "Wildlife"
];

export const faqs = [
  {
    question: "What is the best time to visit India?",
    answer: "The best time to visit India is during the winter months, from October to March, when the weather is pleasant across most parts of the country. However, specific regions like hill stations are best visited during summer (April-June), and the Northeastern states are beautiful during monsoon (June-September)."
  },
  {
    question: "Do I need a visa to visit India?",
    answer: "Yes, most foreign nationals require a visa to enter India. India offers e-Visa facilities for tourism, business, and medical purposes for citizens of over 160 countries. It's recommended to apply at least 4-7 days before your planned travel date."
  },
  {
    question: "What languages are spoken in India?",
    answer: "India has 22 officially recognized languages. Hindi is the most widely spoken and, along with English, is used for official purposes. Each state typically has its own official language, but you'll find English speakers in most tourist areas, hotels, and restaurants."
  },
  {
    question: "Is Indian food always spicy?",
    answer: "Not all Indian food is spicy. India offers a diverse cuisine that varies by region, with many mild dishes available. When ordering at restaurants, you can always request your food to be prepared with less spice according to your preference."
  },
  {
    question: "What should I pack for my trip to India?",
    answer: "Pack light, comfortable cotton clothing, modest attire for visiting religious sites (covering shoulders and knees), a good pair of walking shoes, sunscreen, hat, insect repellent, and any necessary medications. A lightweight scarf is useful for women to cover their heads at religious sites."
  },
  {
    question: "Is it safe to drink tap water in India?",
    answer: "It's not recommended to drink tap water in India. Stick to bottled water with sealed caps, and avoid ice in drinks unless you're sure it's made from purified water. Most reputable hotels and restaurants use filtered water for ice."
  },
  {
    question: "What is the currency of India and can I use credit cards?",
    answer: "The Indian Rupee (₹) is the official currency. Credit cards are widely accepted in urban areas and tourist destinations, but it's advisable to carry some cash for smaller establishments and rural areas. ATMs are readily available in cities and towns."
  },
  {
    question: "How do I travel between cities in India?",
    answer: "India has extensive transportation networks. Domestic flights connect major cities. The railway system is vast and economical. State-run and private buses operate between cities and towns. In tourist areas, you can hire taxis or use ride-sharing apps like Ola and Uber."
  },
  {
    question: "What are some cultural etiquette tips for travelers in India?",
    answer: "Remove shoes before entering homes and religious places. Dress modestly, especially at religious sites. Use your right hand for eating and giving/receiving items. Ask permission before photographing people. Public displays of affection are generally frowned upon."
  },
  {
    question: "Are there any health precautions I should take before traveling to India?",
    answer: "Consult your doctor about vaccinations 4-6 weeks before travel. Consider hepatitis A, typhoid, and tetanus vaccines. Take malaria prevention measures if visiting affected regions. Carry a basic first-aid kit and any prescription medications you need."
  }
];

export const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Wanderlust Adventures planned our family trip to Rajasthan perfectly! Every detail was taken care of, from comfortable accommodations to knowledgeable local guides. The cultural experiences were authentic and memorable.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "2",
    name: "Arjun Patel",
    location: "Bangalore",
    text: "My solo backpacking trip across Northeast India was brilliantly organized. The team was responsive to my needs and the itinerary offered the perfect balance of adventure and relaxation.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "3",
    name: "Meera and Rahul Khanna",
    location: "Delhi",
    text: "Our honeymoon in Kerala was magical! The houseboat stay and ayurvedic spa experiences recommended by Wanderlust were highlights of our trip. We've already booked our next adventure with them!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: "4",
    name: "James Wilson",
    location: "London, UK",
    text: "As an international traveler visiting India for the first time, I was apprehensive. But Wanderlust Adventures created an incredible itinerary that gave me authentic experiences while ensuring comfort and safety throughout.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    id: "5",
    name: "Sanjay Mehta",
    location: "Pune",
    text: "The team's knowledge of offbeat destinations is impressive! They recommended places in Himachal that weren't on any typical tourist map, and those became the highlights of our journey.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: "6",
    name: "Anika Reddy",
    location: "Hyderabad",
    text: "Their attention to detail made our family vacation stress-free. From dietary preferences to activities suitable for different age groups, everything was considered.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/75.jpg"
  }
];
