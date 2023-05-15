import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { getmap, GetHousesList } from "@/api/map";
import { Toast } from "react-vant";

// 覆盖物样式
const labelStyle = {
  cursor: "pointer",
  border: "0px solid rgb(255, 0, 0)",
  padding: "0px",
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: "rgb(255, 255, 255)",
  textAlign: "center",
};
type Props = {};

function BaiduMap({}: Props) {
  var map;
  const [state, setState] = useState([]);
  const [isShowList, setShow] = useState(false);
  const mapinit = () => {
    map = new BMapGL.Map("container");

    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem("city"));
    // 初始化地图实例
    map.centerAndZoom(new BMapGL.Point(116.28, 40.049), 18);

    //创建地址解析器实例
    var myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      function (point) {
        if (point) {
          //  初始化地图
          map.centerAndZoom(point, 11);
          map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件
          map.addControl(new BMapGL.ZoomControl()); // 添加缩放表控件
          // map.addControl(new BMapGL.CityListControl()); //城市选择列表
          renderOverlays(value);
          //     var opts = {
          //       position: point, // 指定文本标注所在的地理位置
          //       offset: new BMapGL.Size(-30, -30), // 设置文本偏移量
          //     };
          //     // 创建文本标注对象

          //     var label = new BMapGL.Label("欢迎使用百度地图JSAPI GL版本", opts);
          //     label.setContent(` <div class="${styles.bubble}">
          //   <p class="${styles.name}">上海</p>
          //   <p>99套</p>
          // </div>`);
          //     label.addEventListener("click", () => {
          //       console.log("被点击了");
          //     });
          //     map.addOverlay(label);
        } else {
          alert("您选择的地址没有解析到结果！");
        }
      },
      label
    );
  };

  // 渲染覆盖物入口
  // 1 接收区域 id 参数，获取该区域下的房源数据
  // 2 获取房源类型以及下级地图缩放级别
  const renderOverlays = async (id) => {
    try {
      // 开启loading
      Toast.loading({
        message: "加载中...",
      });

      const res = await getmap(id);
      if (res) Toast.clear;
      const data = res.data.body;
      // console.log(data);

      // 调用 getTypeAndZoom 方法获取级别和类型
      const { nextZoom, type } = getTypeAndZoom();
      console.log(nextZoom, type);

      data.forEach((item) => {
        // 创建覆盖物
        createOverlays(item, nextZoom, type);
      });
    } catch (e) {
      // 关闭 loading
      // Toast.hide();
    }
  };
  // 创建覆盖物
  const createOverlays = (data, zoom, type) => {
    console.log(data);

    const {
      coord: { longitude, latitude },
      label: areaName,
      count,
      value,
    } = data;

    // 创建坐标对象
    const areaPoint = new BMapGL.Point(longitude, latitude);

    if (type === "circle") {
      // 区或镇
      createCircle(areaPoint, areaName, count, value, zoom);
    } else {
      // 小区
      createRect(areaPoint, areaName, count, value);
    }
  };
  // 创建区、镇覆盖物
  const createCircle = (point, name, count, id, zoom) => {
    // 创建覆盖物
    const label = new BMapGL.Label("", {
      position: point,
      offset: new BMapGL.Size(-35, -35),
    });

    // 给 label 对象添加一个唯一标识
    label.id = id;

    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
      </div>
    `);

    // 设置样式
    label.setStyle(labelStyle);

    // 添加单击事件
    label.addEventListener("click", () => {
      // 调用 renderOverlays 方法，获取该区域下的房源数据
      renderOverlays(id);

      // 放大地图，以当前点击的覆盖物为中心放大地图
      map.centerAndZoom(point, zoom);

      // 解决清除覆盖物时，百度地图API的JS文件自身报错的问题
      setTimeout(() => {
        // 清除当前覆盖物信息
        map.clearOverlays();
      }, 0);
    });

    // 添加覆盖物到地图中
    map.addOverlay(label);
  };
  // 创建小区覆盖物
  const createRect = (point, name, count, id) => {
    // 创建覆盖物
    const label = new BMapGL.Label("", {
      position: point,
      offset: new BMapGL.Size(-50, -28),
    });

    // 给 label 对象添加一个唯一标识
    label.id = id;

    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `);

    // 设置样式
    label.setStyle(labelStyle);

    // 添加单击事件
    label.addEventListener("click", (e) => {
      // 获取并渲染房源数据
      getHousesList(id);

      // 获取当前被点击项
      const target = e.changedTouches[0];
      map.panBy(
        window.innerWidth / 2 - target.clientX,
        (window.innerHeight - 330) / 2 - target.clientY
      );
    });

    // 添加覆盖物到地图中
    map.addOverlay(label);
  };

  // 获取小区房源数据
  const getHousesList = async (id) => {
    try {
      // 开启loading
      Toast.loading("加载中...");
      //拿到城市的列表
      const res = await GetHousesList(id);
      // 关闭 loading
      Toast.clear();

      // this.setState({
      //   housesList: res.data.body.list,
      //   // 展示房源列表
      //   isShowList: true,
      // });
      setState(res.data.body.list);
      setShow(true);
    } catch (e) {
      // 关闭 loading
      Toast.clear();
    }
  };

  // 计算要绘制的覆盖物类型和下一个缩放级别
  // 区   -> 11 ，范围：>=10 <12
  // 镇   -> 13 ，范围：>=12 <14
  // 小区 -> 15 ，范围：>=14 <16
  const getTypeAndZoom = () => {
    // 调用地图的 getZoom() 方法，来获取当前缩放级别
    const zoom = map.getZoom();
    let nextZoom, type;
    // console.log('当前地图缩放级别：', zoom)
    if (zoom >= 10 && zoom < 12) {
      // 区
      // 下一个缩放级别
      nextZoom = 13;
      // circle 表示绘制圆形覆盖物（区、镇）
      type = "circle";
    } else if (zoom >= 12 && zoom < 14) {
      // 镇
      nextZoom = 15;
      type = "circle";
    } else if (zoom >= 14 && zoom < 16) {
      // 小区
      type = "rect";
    }
    console.log(nextZoom, type);

    return {
      nextZoom,
      type,
    };
  };

  useEffect(() => {
    mapinit();
  }, []);
  return (
    <>
      <div className="map" style={{ height: "94vh", width: "100vw" }}>
        <div id="container" style={{ height: "100%", width: "100vw" }}></div>
      </div>
    </>
  );
}

export default BaiduMap;
