// import Vue from 'vue'
let files = require.context('../pages', true, /entry\.vue$/); // 根据目录结构去搜索文件
let filesKey = files.keys(); // 获取整个目录结构
console.log(filesKey);
/**
 * 以一级文件或者文件夹 分类获取路由
 */
const createClassify = () => {
  let map = filesKey.reduce((map, cur) => {
    let dislodge = cur.match(/\/(.+?)\.vue$/)[1]; // 只匹配纯文件名的字符串
    console.log(dislodge);
    let key = dislodge.split('/')[0]; // 拿到一级文件的名称
    (map[key] || (map[key] = [])).push(dislodge);
    return map;
  }, {});
  return getRoutes(map);
};

const loadComponent = (path) => () => import(`@/pages/${path}/entry.vue`);

/**
 * 构建路由
 * @param {*} map type：Object
 */
const getRoutes = (map) => {
  let res = [];
  for (let key in map) {
    let path = map[key][0];
    let route = {
      path: '/' + key,
      name: path
        .split(`/`)
        .join('-')
        .toUpperCase(),
      component: loadComponent(key),
    };
    res.push(route);
  }
  return res; // 返回整个route对象
};

const freeRoute = createClassify();
const routes = [...freeRoute];
export default routes;
