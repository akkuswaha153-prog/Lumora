import React, { useEffect, useRef } from 'react';

const AdUnit = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Adsterra Configuration
    const adKey = "YOUR_ADSTERRA_KEY_HERE"; // Apni key yahan daalein
    
    const conf = document.createElement('script');
    conf.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;

    if (adRef.current) {
      adRef.current.innerHTML = ''; // Clear previous if any
      adRef.current.appendChild(conf);
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div style={{ margin: '20px auto', textAlign: 'center', minHeight: '70px' }}>
      <span style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '5px' }}>
        ADVERTISEMENT
      </span>
      <div ref={adRef}></div>
    </div>
  );
};

export default AdUnit;
