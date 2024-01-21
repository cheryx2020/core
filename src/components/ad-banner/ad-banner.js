import React, { useEffect } from "react";

const AdBanner = ({adLayout = "in-article", adFormat = "fluid", adClient="ca-pub-4179656549806780", adSlot = "9675079770"}) => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <ins
    className="adsbygoogle adbanner-customize"
    style={{
      display: "block"
    }}
    data-ad-layout={adLayout}
    data-ad-format={adFormat}
    data-ad-client={adClient}
    data-ad-slot={adSlot}
  />;
};

export default AdBanner;