import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MoviesPage = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-20 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-4 font-heading text-primary">Travel Movies</h1>
                <p className="text-muted-foreground text-center max-w-2xl">
                    Get inspired by our curated list of the best travel movies. Coming soon!
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default MoviesPage;
