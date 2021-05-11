import Antd, { Cascader, Select, Tabs } from 'ant-design-vue';
export default function initAntdv(Vue) {
  Vue.use(Antd)
  Vue.component(Cascader.name, Cascader)
  Vue.component(Select.name, Select)
  Vue.component(Tabs.name, Tabs)
}