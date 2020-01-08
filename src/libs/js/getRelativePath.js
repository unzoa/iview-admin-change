/**
 * [tree数据格式]
 * [
 *  {
 *    label: 1,
 *    children: [{
 *      id: Number,
 *      fullpath: String,
 *      label: '1-1',
 *      children: [{
 *        label: '1-1-1',
 *        children: []
 *      }]
 *    }]
 *  }
 * ]
 */

export function getRelativePath (files) {
  /**
   * [getRelativePath 获取input type=file上传的路径，转换成tree数据格式]
   * @param {[Array]} files [上传的files数组]
   * @return {[Array] [转换成的tree数据]}
   */

  let relativePaths = []

  // 遍历查找子集，添加子集
  let id = 1
  const superFunc = dirPathArr => { // 递归去添加子集
    // dirPathArr: ['1', '1-1', '1-1-1', 'a-a-a-a']

    // 查询dirPathArr
    dirPathArr.forEach((dirPath, dirPathArrIndex) => {
      let isfirstLevelLabelExist = false // 第一层是否存在了
      let objLevel = dirPathArrIndex // 知道是对象的第几层

      // 匹配超集
      relativePaths.forEach((relativePath, relativePathsIndex) => {
        let obj = relativePath // {} || {label:'', children: []}

        if (objLevel === 0) { // 判断第一层是否存在这个label, 只判断一次
          if (dirPath === relativePath.label) {
            isfirstLevelLabelExist = true
            return false
          }
        } else { // 深于第一层
          let newChildren = obj.children // 超集的第一层的children: array

          // **查询第几层children**
          // **对象子集的拼接赋值**
          let level = 1
          while (level < objLevel) {
            newChildren.forEach((child, childIndex) => {
              newChildren = child.children || []
            })
            level++
          }

          if (newChildren.label === dirPathArr[dirPathArrIndex - 1] ||
            !newChildren.label) { // 判断获取的children
            // 判断子路径 label 是否存在
            let flag = false
            newChildren.forEach((child, childIndex) => {
              flag = child.label === dirPath
            })

            if (!flag) {
              id++
              newChildren.push({
                id,
                fullPath: dirPathArr.slice(0, objLevel).join('/') + '/' + dirPath,
                other: '',
                label: dirPath,
                children: []
              })
            }
          }
        }
      })

      if (!isfirstLevelLabelExist && objLevel === 0) {
        relativePaths.push({
          id,
          fullPath: dirPath,
          other: '',
          label: dirPath,
          children: []
        })
      }
    })
  }

  for (let i in files) {
    if (!isNaN(i)) {
      let filePathArr = files[i].webkitRelativePath.split('/') // ['1', '1-1', 'fileName']
      // let dirPathArr = filePathArr.slice(0, filePathArr.length - 1) // 多级文件夹 ['1', '1-1']

      superFunc(filePathArr) // 处理本文件的路径到tree数据中
    }
  }

  return {relativePaths, length: id}
}

export function treeNodeOperate (treeData, filePath, other) {
  /**
   * [getTreeNodeId] 根据完整路径, 查找treeData的id
   * @param {Array} treeData [树]
   * @param {String} filePath [文件的全路径]
   * @param {String} other [其他显示]
   * @return {Number} [文件的树形节点id]
   */

  let nodeId = 1
  let filePathArr = filePath.split('/')

  // 匹配treeData
  // 查找第一层的children
  let newChildren = [] // 子集的继承
  treeData.forEach(nodeItem => {
    if (nodeItem.label === filePathArr[0]) { // 判断第一层存在在哪里
      newChildren = nodeItem.children
      return false
    }
  })

  let filePath1ToLength = filePathArr.slice(1, filePath.length)
  filePath1ToLength.forEach(path => {
    // **查询n层children**
    const searchNewChildren = () => {
      newChildren.forEach(child => {
        // 判断子集的label在哪里
        if (child.label === path) {
          if (!child.children.length) {
            nodeId = child.id

            // other
            if (other) {
              child.other = other
            }
          } else {
            newChildren = child.children
            searchNewChildren()
          }

          return false
        }
      })
    }
    searchNewChildren()
  })

  return nodeId
}
