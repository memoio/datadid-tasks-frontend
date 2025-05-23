"use client";
import Script from "next/script";

// product
const ga_tracking_id = "G-RSXQBVJPBH";

// test
//const ga_tracking_id = "G-MBDM567PKS";

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${ga_tracking_id}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
            >
                {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${ga_tracking_id}');`}
            </Script>
        </>
    );
};

export default GoogleAnalytics;