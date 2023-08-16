import React, { useEffect } from "react";
import Awards from "./awards/Awards";
import Hero from "./hero/Hero";

const Home = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/64a0bda394cf5d49dc60f960/1h49u9iff";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");

      window.Tawk_API = Tawk_API;
      Tawk_API.onLoad = function () {
        Tawk_API.minimize();
      };

      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <>
      {/* Start of Tawk.to Script */}
      <script type="text/javascript">
        {`
          // Tawk.to Widget Configuration
          var Tawk_API = Tawk_API  {};
          Tawk_API.onLoad = function () {
            // Minimize the widget on load
            Tawk_API.minimize();
          };
        `}
      </script>
      {/* End of Tawk.to Script */}

      <Hero />
      <Awards />
    </>
  );
};

export default Home;