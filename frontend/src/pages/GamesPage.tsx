import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GamesPage = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-20 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-4 font-heading text-primary">Travel Games</h1>
                <p className="text-muted-foreground text-center max-w-2xl">
                    Fun games to play on your journey. Coming soon!
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default GamesPage;
