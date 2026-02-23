import React, { useEffect, useRef } from 'react';

const AdsterraBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Adsterra script ko load karne ka logic
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    
    // YAHAN APNA ADSTERRA SCRIPT KEY DALEN (Jo aapke panel me milega)
    // Example: atOptions = { 'key' : 'your_key_here', 'format' : 'iframe', ... }
    const conf = document.createElement('script');
    conf.innerHTML = `
      atOptions = {
        'key' : 'YOUR_ADSTERRA_UNIT_KEY_HERE',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    
    script.src = `//www.highperformanceformat.com/YOUR_ADSTERRA_UNIT_KEY_HERE/invoke.js`;

    if (adRef.current) {
      adRef.current.appendChild(conf);
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="ad-container" ref={adRef}>
      <p className="ad-label">Advertisement</p>
      <style jsx>{`
        .ad-container {
          margin: 15px auto;
          text-align: center;
          min-height: 60px;
          width: 100%;
          overflow: hidden;
        }
        .ad-label {
          font-size: 10px;
          color: #475569;
          margin-bottom: 4px;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default AdsterraBanner;
