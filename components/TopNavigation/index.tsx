import React, { FC, useEffect, useState } from "react";
import { Flex } from "react-vant";
import styles from "./index.module.scss";
import { getCityinfo } from "@/api/homeModule";
import { useRouter } from "next/router";

const TopNavigation = () => {
  const router = useRouter();

  const [city, setcity] = useState("");
  const getlist = () => {
    const cnewity: String =
      JSON.parse(localStorage.getItem("city")).label || "上海";
    setcity(cnewity);
  };
  useEffect(() => {
    getlist();
    // var myCity = new BMapGL.LocalCity();
    // myCity.get(async (res) => {
    //   const {
    //     data: { body },
    //   } = await getCityinfo(res.name);
    //   setcity((city) => body.label);
    // });
  });
  return (
    <Flex className={styles.search_box}>
      {/* 左侧白色区域 */}
      <Flex className={styles.search}>
        {/* 位置 */}
        <div className={styles.location}>
          <span onClick={() => router.push("/ctiylist")}>{city}</span>
          {/* <i className="iconfont icon-arrow" /> */}
          <svg
            t="1679666750559"
            className={"icone"}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2127"
            width="12"
            height="12"
          >
            <path
              d="M787.2 380.8c-9.6-9.6-22.4-12.8-35.2-12.8l-480 3.2c-12.8 0-25.6 3.2-35.2 12.8-19.2 19.2-19.2 48 0 67.2l240 240c0 0 0 0 0 0 0 0 0 0 0 0 3.2 3.2 9.6 6.4 12.8 9.6 0 0 3.2 3.2 3.2 3.2 16 6.4 38.4 3.2 51.2-9.6l240-243.2C806.4 428.8 803.2 400 787.2 380.8z"
              p-id="2128"
            ></path>
          </svg>
        </div>

        {/* 搜索表单 */}
        <div
          className={styles.form}
          onClick={() => router.push("/search?n=123")}
        >
          {/* <i className="iconfont icon-seach" /> */}
          <span className={styles.text}>请输入小区或地址</span>
        </div>
      </Flex>
      {/* 右侧地图图标 */}
      {/* <i className="iconfont icon-map" /> */}
      <svg
        t="1679666866767"
        className={"icone"}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3762"
        width="25"
        height="25"
      >
        <path
          d="M85.333333 469.717333C85.333333 451.829333 99.658667 437.333333 117.333333 437.333333s32 14.506667 32 32.384V786.133333c0 5.962667 4.778667 10.794667 10.666667 10.794667a10.56 10.56 0 0 0 5.045333-1.28l154.848-84.021333a73.898667 73.898667 0 0 1 72.853334 1.290666l252.544 148.842667a10.56 10.56 0 0 0 10.122666 0.341333l213.333334-107.264c3.626667-1.824 5.92-5.568 5.92-9.664V469.717333C874.666667 451.829333 888.992 437.333333 906.666667 437.333333s32 14.506667 32 32.384V745.173333c0 28.682667-16.053333 54.890667-41.44 67.658667l-213.333334 107.264a73.898667 73.898667 0 0 1-70.805333-2.378667L360.533333 768.896a10.56 10.56 0 0 0-10.410666-0.192l-154.848 84.032a73.973333 73.973333 0 0 1-35.285334 8.96c-41.237333 0-74.666667-33.813333-74.666666-75.552V469.717333z m672-132.266666c0 87.808-73.173333 192.917333-217.056 320.288a42.666667 42.666667 0 0 1-56.554666 0C339.829333 530.378667 266.666667 425.258667 266.666667 337.450667 266.666667 203.968 376.64 96 512 96s245.333333 107.968 245.333333 241.450667z m-426.666666 0c0 61.514667 59.712 149.557333 181.333333 259.701333 121.621333-110.144 181.333333-198.186667 181.333333-259.701333C693.333333 239.584 612.277333 160 512 160s-181.333333 79.573333-181.333333 177.450667zM512 405.333333a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
          fill="#000000"
          p-id="3763"
          onClick={() => router.push("/map")}
        ></path>
      </svg>
    </Flex>
  );
};

export default TopNavigation;
