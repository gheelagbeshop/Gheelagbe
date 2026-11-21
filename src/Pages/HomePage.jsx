import React from "react";
import Hero from "../components/Hero";
import HomeSections from "../components/HomeSections";
import SEO from "../components/SEO";

const HomePage = () => {
  return (
    <>
      <SEO
        title="GheeLagbe | খাঁটি ও প্রাকৃতিক খাদ্যসামগ্রী"
        description="GheeLagbe থেকে সংগ্রহ করুন খাঁটি ঘি, সরিষার তেল ও প্রাকৃতিক গুড়। বাংলাদেশের বিশ্বস্ত অনলাইন খাদ্যসামগ্রীর দোকান।"
        canonical="https://gheelagbe.com/"
      />
      <Hero />
      <HomeSections />
    </>
  );
};

export default HomePage;
