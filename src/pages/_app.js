import ContextProvider from "../context/ContextProvider";
import "../assets/vendors/animate.min.css";
import "../assets/vendors/font-awesome.min.css";
import "../assets/vendors/flaticon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "node_modules/swiper/swiper-bundle.min.css";
import "react-modal-video/css/modal-video.css";

// extra css
import "../styles/default.css";
import "../styles/style.scss";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider >
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SessionProvider>
  )
}

export default MyApp;
