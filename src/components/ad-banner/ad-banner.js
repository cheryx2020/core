import React, { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
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
    data-ad-layout="in-article"
    data-ad-format="fluid"
    data-ad-client="ca-pub-4179656549806780"
    data-ad-slot="9675079770"
  />;
};

export default AdBanner;