
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://gheelagbe.com";

const SEO = ({
  title = "GheeLagbe | খাঁটি ও প্রাকৃতিক খাদ্যসামগ্রী",
  description = "GheeLagbe থেকে সংগ্রহ করুন খাঁটি ঘি, সরিষার তেল, প্রাকৃতিক গুড় এবং মানসম্মত দেশি খাদ্যসামগ্রী।",
  canonical,
  image = `${SITE_URL}/gheelagbeicon.png`,
  noindex = false,
  structuredData,
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
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");

    // Open Graph
    setMeta("property", "og:type", structuredData?.["@type"] === "Product" ? "product" : "website");
    setMeta("property", "og:site_name", "GheeLagbe");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:image", image);
    setMeta("property", "og:locale", "bn_BD");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    // Canonical URL
    let canonicalElement = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.rel = "canonical";
      document.head.appendChild(canonicalElement);
    }

    canonicalElement.href = pageUrl;

    // Structured Data
    const schemaId = "gheelagbe-jsonld";
    let schemaElement = document.getElementById(schemaId);

    if (structuredData) {
      if (!schemaElement) {
        schemaElement = document.createElement("script");
        schemaElement.id = schemaId;
        schemaElement.type = "application/ld+json";
        document.head.appendChild(schemaElement);
      }

      schemaElement.textContent = JSON.stringify(structuredData);
    } else if (schemaElement) {
      schemaElement.remove();
    }

    return () => {
      // The next route will update or remove the metadata and schema.
    };
  }, [
    title,
    description,
    canonical,
    image,
    noindex,
    structuredData,
    location.pathname,
  ]);

  return null;
};

export default SEO;
