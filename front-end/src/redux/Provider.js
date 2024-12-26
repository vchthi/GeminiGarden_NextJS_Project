"use client";
//nhúng Provider
import { Provider } from "react-redux";
//nhúng store
import { store } from "./store";


function Providers({ children }) {
    //truyền cho các component con props đó là store
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;