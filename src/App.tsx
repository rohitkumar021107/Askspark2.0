/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Team from './components/Team';
import Story from './components/Story';
import CTA from './components/CTA';
import Footer from './components/Footer';

// Pages
import AskPage from './pages/AskPage';
import LivePage from './pages/LivePage';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import DoubtDetailPage from './pages/DoubtDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Story />
      <Team />
      <CTA />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Background Decorative Orbs */}
        <div className="fixed -top-20 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px] -z-10"></div>
        <div className="fixed bottom-20 right-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[120px] -z-10"></div>
        
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/ask" element={<AskPage />} />
              <Route path="/live" element={<LivePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/doubt/:id" element={<DoubtDetailPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
