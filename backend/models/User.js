import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    wishlist: [{ type: String }],
    wanderlustPoints: { type: Number, default: 500 },
    loyaltyTier: { type: String, default: 'Explorer', enum: ['Explorer', 'Adventurer', 'Voyager'] }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
