"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Academic from "@/components/Academic";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Vlog from "@/components/Vlog";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";
import SplashScreen from "@/components/SplashScreen";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const fromVlogDetails = url.searchParams.get("fromVlogDetails") === "1";

    if (!fromVlogDetails) return;

    setShowLoading(false);
    setShowSplash(false);

    url.searchParams.delete("fromVlogDetails");
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowSplash(true);
  };

  const handleStart = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : showSplash ? (
        <SplashScreen onStart={handleStart} />
      ) : (
        <>
          <AnimatedBackground />
          <Navbar />
          <main>
            <div id="home">
              <HeroSection />
            </div>
            <About />
            <Academic />
            <Skills />
            <Projects />
            <Vlog />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
