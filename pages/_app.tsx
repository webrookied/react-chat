import { useRouter } from "next/router";
import type { AppProps } from "next/app";
// import 'normalize.css'
import "react-virtualized/styles.css";
import "../styles/globals.css";
import Tab from "../components/tabbar/index";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let enter = ["/home", "/message", "/goodlook", "/my", "/myfamily"];
  let flag = enter.includes(router.pathname);
  return (
    <div>
      <div>
        <Component {...pageProps} />
      </div>
      {flag ? (
        <div>
          <Tab></Tab>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
