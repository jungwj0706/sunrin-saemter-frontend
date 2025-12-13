import React from "react";
import Hero from "./Hero"
import Features from "./Features"
import FAQ from "./FAQ"


import '../../styles/pages/home.css';

function Home() {
    return (
        <div className="home-page">
            <main>
                <Hero />
                <Features />
                <FAQ />
            </main>
            
        </div>
    )
}

export default Home;