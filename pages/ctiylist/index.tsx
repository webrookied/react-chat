// 城市页面
import React, { useEffect, useState } from "react";
import { Toast, NavBar } from "react-vant"; //引入组件
import style from "./index.module.scss"; //引入css样式
import { useRouter } from "next/router"; //路由跳转、
import { IndexBar, Cell } from "react-vant";
import { Notify } from "react-vant";
import { http } from "../../utils/request";
import { getCurrentCity } from "@/utils/currentcity";
import { List, AutoSizer } from "react-virtualized";


// 封装处理字母索引的方法
const formatCityIndex = (letter) => {
  switch (letter) {
    case "#":
      return "当前定位";
    case "hot":
      return "热门城市";
    default:
      return letter.toUpperCase();
  }
};

// 索引（A、B等）的高度
const TITLE_HEIGHT = 36;
// 每个城市名称的高度
const NAME_HEIGHT = 50;
// 有房源的城市
const HOUSE_CITY = ["北京", "上海", "广州", "深圳"];
//处理数组
function fromCityData(list) {
  const cityList = {};
  //1.遍历list 数组
  list.forEach((item) => {
    //2.获取每一个城市的首字母
    const first = (item.short as String).substr(0, 1);
    //3.判断citylist 中是否有该分类
    if (cityList[first]) {
      //如果有吧对应的城市加进去
      cityList[first].push(item);
    } else {
      //如果没有就创建一个数组，然后把当前城市的添加进去
      cityList[first] = [item];
    }
  });
  let cityIndex = Object.keys(cityList).sort();

  return {
    cityIndex,
    cityList,
  };
}
const Pagecity = () => {
  const [list, setList] = useState({});
  const [cityindex, setindex] = useState<string[]>([]);
  const [activeIndex, setactiveIndex] = useState(0);
  //获取Dom
  const cityListComponent = React.createRef();

  //路由实例
  const router = useRouter();
  //点击返回条状上一个页面
  const handleBackClick = () => {
    router.back();
  };
  //获取城市的数据
  const getList = async () => {
    const resp = await http.get("/area/city?level=1");
    const { cityIndex, cityList } = fromCityData(resp.data.body);
    // 获取热门城市
    const hotresp = await http.get("/area/hot");
    cityList["hot"] = hotresp.data.body;
    cityIndex.unshift("hot");
    // 获取当前城市定位信息
    let curCity = await getCurrentCity();

    // 将当前城市数据添加到 cityList
    cityList["#"] = curCity;
    // 将当前城市数据添加到 cityIndex
    cityIndex.unshift("#");
    // console.log(cityIndex, cityList);
    setList(cityList);
    setindex(cityIndex);
    // setTimeout(() => {
    //   (cityListComponent.current as any).measureAllRows;
    // }, 100);
    // cityListComponent.current.measureAllRows();
    // console.log(cityListComponent.current);

    // 循环将数组short字符串截取第一个字符
    // let newList: String[] = [];
    // resp.data.body.forEach((item) => {
    //   newList.push(item.short.substr(0, 1));
    // });

    // 将截取后的数组去重
    // newList = [...new Set(newList)];
    // 将去重后的数组 使用charCodeAt 进行一个数字转换并排序
    // newList = newList.sort((a, b) => {
    //   console.log(a, b);
    //   return a.charCodeAt() - b.charCodeAt();
    // });
    // console.log(newList.sort());

    // newList.sort;
    // 拿到总数据
    // let newTer = resp.data.body;
    // const {} = fromCityData;
    // resp.data.body;
    // // 定义一个空数组,用来接收最后筛选后的数据
    // let newArr = [];
    // //  将去重后的数据进行筛序,不是一定要使用map
    // newList.map((item) => {
    //   // 将总数据的字符串进行截取并和去重后的数组进行比对筛选
    //   let a = newTer.filter((v) => v.short.slice(0, 1) === item);
    //   // 将筛选后的数据添加到事先定义好的数组 title(A-Z) children(城市名)
    //   newArr.push({ title: item.toLocaleUpperCase(), children: a });
    // });
    // setList(newArr); //调用
  };
  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    // list !== undefined && cityListComponent.current.measureAllRows();
    console.log(cityListComponent.current);

    // console.log(cityListComponent);
  }, [list]);
  const rowRenderer = ({
    key, // 行数组中的唯一键
    index, // 集合中的行索引
    isScrolling, // 列表当前正在滚动
    isVisible, // 这一行在列表中是可见的(例如，它不是一个过度扫描行)
    style, // 样式对象应用于行(定位它)
  }) => {
    let letter = cityindex[index];
    let citys = list[letter];

    const changeCity = ({ label, value }) => {
      if (HOUSE_CITY.indexOf(label) > -1) {
        // 有
        localStorage.setItem("city", JSON.stringify({ label, value }));
        router.back();
      } else {
        Toast.info("该城市暂无房源数据");
      }
    };

    return (
      <div key={key} style={style} className={style.city}>
        <div
          style={{
            fontSize: "14px",
            padding: "10px 15px",
            color: " #999",
          }}
        >
          {formatCityIndex(letter)}
        </div>
        {list[letter].label ? (
          <div
            key={list[letter].value}
            style={{
              width: "100%",
              height: "50px",
              padding: "0 15px",
              lineHeight: "50px",
              borderBottom: "1px solid #eeeeee",
              fontSize: "16px",
              color: "#333",
              background: "#fff",
              cursor: "pointer",
            }}
            onClick={() => changeCity(item)}
          >
            {list[letter].label}
          </div>
        ) : (
          list[letter].length > 0 &&
          list[letter].map((item) => (
            <div
              className={style.name}
              key={item.value}
              style={{
                width: "100%",
                height: "50px",
                padding: "0 15px",
                lineHeight: "50px",
                borderBottom: "1px solid #eeeeee",
                fontSize: "16px",
                color: "#333",
                background: "#fff",
                cursor: "pointer",
              }}
              onClick={() => changeCity(item)}
            >
              {item.label}
            </div>
          ))
        )}
      </div>
    );
  };
  // 创建动态计算每一行高度的方法
  const getRowHeight = ({ index }) => {
    // 索引标题高度 + 城市数量 * 城市名称的高度
    if (index == 0) {
      return 86;
    } else {
      return TITLE_HEIGHT + list[cityindex[index]].length * NAME_HEIGHT;
    }
  };

  const goBack = (label) => {
    // console.log(label, 'label')
    localStorage.setItem("city", label);
    Notify.show({
      type: "success",
      message: label,
    });
    router.back();
  };
  const goValue = (value) => {
    // console.log(value)
    localStorage.setItem("searchValue", value);
  };
  //点击索引
  const onSelect = (index) => {
    console.log(index);
  };
  // 封装渲染右侧索引列表的方法
  const renderCityIndex = () => {
    // 获取到 cityIndex，并遍历其，实现渲染
    return cityindex.map((item, index) => (
      <li
        className={style.city_index_item}
        key={item}
        onClick={() => {
          // console.log("当前索引号：", index);
          cityListComponent.current.scrollToRow(index);
        }}
      >
        <style jsx>{`
          .index_active {
            color: #fff;
            background-color: #21b97a;
            border-radius: 100%;
            display: inline-block;
            font-size: 12px;
            width: 15px;
            height: 15px;
            line-height: 15px;
          }
        `}</style>
        <span className={activeIndex === index ? "index_active" : ""}>
          {item === "hot" ? "热" : item.toUpperCase()}
        </span>
      </li>
    ));
  };
  // 用于获取List组件中渲染行的信息
  const onRowsRendered = ({ startIndex }) => {
    // console.log('startIndex：', startIndex)
    if (activeIndex !== startIndex) {
      setactiveIndex(startIndex);
    }
  };
  return (
    <div className={style.city_wrpa}>
      <NavBar
        title="城市选择"
        leftText="返回"
        className={style.cityTop}
        onClickLeft={handleBackClick}
      />
      <div className={style.citylist}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={cityListComponent}
              height={height}
              rowCount={cityindex.length}
              rowHeight={getRowHeight}
              rowRenderer={rowRenderer}
              onRowsRendered={onRowsRendered}
              scrollToAlignment="start"
              width={width}
            />
          )}
        </AutoSizer>
        {/* 右侧索引列表 */}
        <ul className={style.city_index}>{renderCityIndex()}</ul>
      </div>

      {/* <IndexBar highlightColor={"#3f45ff"}>
        {list.map((item) => {
          return (
            <div key={item}>
              <IndexBar.Anchor
                index={item.title}
                onClick={() => onSelect(item.title)}
              />
              {item.children.map((item) => {
                return (
                  <div key={item}>
                    <Cell
                      title={item.label}
                      onClick={() => {
                        goBack(item.label);
                        goValue(item.value);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </IndexBar> */}
    </div>
  );
};

export default Pagecity;
