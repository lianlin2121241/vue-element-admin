import store from "./store";

store.dispatch("getDict", [
  "bedroomOriented",
  "buildingType",
  "decorationStatus"
]); //获取数据字典
