import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Tour from "./models/Tour.js";
import User from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsFilePath = path.join(__dirname, "../wanderlust_adventures-main/src/constants/destinations.ts");
const tsFile = fs.readFileSync(tsFilePath, "utf-8");

const arrayStart = tsFile.indexOf("export const destinations: Destination[] = [");
const arrayContentStart = tsFile.indexOf("[", arrayStart);
const arrayContentEnd = tsFile.indexOf("];\n\nexport const categories");
const arrayContent = tsFile.substring(arrayContentStart, arrayContentEnd + 1);

let destinations;
try {
    destinations = eval("(" + arrayContent + ")");
} catch (e) {
    console.error("Failed to parse array", e);
    process.exit(1);
}

const formattedTours = destinations.map(d => ({
    name: d.name,
    location: d.location,
    description: d.description,
    image: d.image,
    price: parseInt(d.price.replace("₹", "").replace(",", "")), // "₹1,500" -> 1500
    rating: d.rating,
    category: d.category,
    detailDescription: d.detailDescription || d.description,
    highlights: d.highlights || [],
    bestTimeToVisit: d.bestTimeToVisit || "Year round",
    thingsToDo: d.thingsToDo || [],
    howToReach: d.howToReach || "Flights and train",
    latitude: d.latitude || 20.0,
    longitude: d.longitude || 77.0,
    suitableFor: d.suitableFor || "All",
}));

console.log(`Prepared ${formattedTours.length} tours for insertion.`);

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(async () => {
        console.log("Connected to MongoDB.");

        // Clear tours
        await Tour.deleteMany({});
        console.log("Cleared old tours.");

        // Insert tours
        await Tour.insertMany(formattedTours);
        console.log("Inserted tours successfully.");

        // Create test user if none exists
        const users = await User.countDocuments();
        if (users === 0) {
            await User.create({
                name: "Test User",
                email: "test@example.com",
                password: "password123", // Later we will hash, for now leaving plain if Auth is mocked or simple
            });
            console.log("Inserted test user.");
        }

        process.exit(0);
    })
    .catch(err => {
        console.error("Error migrating:", err);
        process.exit(1);
    });
