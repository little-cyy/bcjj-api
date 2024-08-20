/**
 * @param {Array} collection
 * @returns {any}
 * @description 随机返回集合中的元素
 */
function sample(collection) {
  return collection[Math.floor(Math.random() * collection.length)];
}

/**
 * @param  {Array} collection
 * @returns {Array}
 * @description 用pId的数据格式转换成有children的数据
 */
function transformToTreeData(data, pId = null) {
  return data
    .filter((item) => item.pId === pId)
    .map((item) => ({
      ...item,
      children: transformToTreeData(data, item.id),
    }));
}

/**
 * @param {Array} collection
 * @returns {Array}
 * @description 将带children的树形结构转换成带pId的扁平结构
 */
function transformToFlatData(treeData) {
  let flatData = [];

  function traverse(node, pId) {
    const { id, name, children } = node;
    flatData.push({ id, pId, name });

    if (children && children.length > 0) {
      children.forEach((child) => traverse(child, id));
    }
  }

  treeData.forEach((node) => traverse(node, null));

  return flatData;
}

module.exports = { sample, transformToTreeData, transformToFlatData };
