import HeroSection from "./components/HeroSection";
import ShowCategories from "./components/ShowCategories";
import MaxWidth from "./partials/MaxWidth";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <MaxWidth>
                <h1 className=' mt-10 text-3xl font-bold text-center mb-4'>Explore Our Product Categories</h1>
                <p className='text-center mb-8'>Select a category to view all available products.</p>
                <ShowCategories />
            </MaxWidth>
        </main>
    );
}
