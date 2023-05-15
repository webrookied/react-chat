import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <script
        type="text/javascript"
        src="https://api.map.baidu.com/api?v=1.0&type=webgl&ak=CQsyQAFvj6WlpIsC0vRs6gGmTGfXKxn6"
      ></script>
      <script src="//at.alicdn.com/t/c/font_3975624_q3awjpsebdk.js"></script>
      {/* <script
        type="text/javascript"
        src="http://api.map.baidu.com/api?v=3.0&ak=Ql6g9FMhKC8AQhzbPG7erzSwCEAMmCCP"
      ></script> */}
    </Html>
  );
}
