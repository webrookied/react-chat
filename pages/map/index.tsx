import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Toast, NavBar } from "react-vant"; //引入组件
const Map = dynamic(import("../../components/map"), {
  ssr: false,
});
const map = () => {
  //路由实例
  const router = useRouter();
  return (
    <div>
      <NavBar
        title="地图选择"
        leftText="返回"
        onClickLeft={() => router.back()}
      />

      <Map></Map>
    </div>
  );
};

export default map;
