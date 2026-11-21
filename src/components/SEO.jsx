
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://gheelagbe.com";

const SEO = ({
  title = "GheeLagbe | খাঁটি ও প্রাকৃতিক খাদ্যসামগ্রী",
  description = "GheeLagbe থেকে সংগ্রহ করুন খাঁটি ঘি, সরিষার তেল, প্রাকৃতিক গুড় এবং মানসম্মত দেশি খাদ্যসামগ্রী।",
  canonical,
  noindex = false,
}) => {
  const location = useLocation();

  useEffect(() => {
    const pageUrl = canonical || `${SITE_URL}${location.pathname}`;

    document.title = title;

    const setMeta = (attribute, key, content) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "GheeLagbe");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:locale", "bn_BD");

    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let canonicalElement = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalElement);
    }

    canonicalElement.setAttribute("href", pageUrl);
  }, [title, description, canonical, noindex, location.pathname]);

  return null;
};

export default SEO;
