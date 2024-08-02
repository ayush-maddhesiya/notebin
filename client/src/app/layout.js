"use client"
import "./global.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "../store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Notebin</title>
        <link rel="icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>cd
  );
}
