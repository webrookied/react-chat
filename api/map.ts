import { GETHttp } from "@/utils/request";
//地图
export const getmap = async (id) => {
  return await GETHttp("/area/map?id=" + id);
};
export const GetHousesList = async (id) => {
  return await GETHttp("/houses?cityId=" + id);
};
