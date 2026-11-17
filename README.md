# 方序 · CUBE LAB

中文 CFOP 速拧教学网页。完整库包括 57 OLL + 21 PLL + 41 F2L = 119 个非复原案例；另外保留两步法入门模式的 19 个教学示例（与完整库有重叠）。默认展示完整库。

## 本地运行

在本目录运行 `python -m http.server 4173 --directory dist`，然后打开 http://localhost:4173 。ES 模块需要通过 HTTP 服务加载，请不要直接双击 HTML。

## 功能

- Three.js 真实分层旋转，支持 R/L/U/D/F/B、M/E/S 中层、全部六面宽转、x/y/z 转体、逆转、180°。
- 案例由逆公式生成，逐步、回退、暂停、重播、速度调整、拖动视角。
- 同一状态模型生成六面展开图；绿色前面、红色右面、白色顶面。
- 分类、搜索、学习标记、练习计时。记录保存在浏览器本地，不上传。
- 手机与桌面响应式布局；WebGL 不可用时保留文字和展开图。

## 文件

`dist/index.html` 页面；`style.css` 样式；`data.js` 公式与讲解；`model.js` 纯状态引擎；`app.js` 动画与交互。

Three.js 0.170.0 与 OrbitControls 已放在 vendor，无运行时 CDN 依赖。第三方许可证位于 `dist/vendor/THREE-LICENSE.txt`。

## 核验

运行 `node verify.mjs`。检查转动逆操作、四次转动复原、54 贴纸完整性、所有公式复原、OLL/PLL 前两层保持、PLL 顶面朝向，以及 OLL 棱块识别数量。

浏览器实测了逐步与整段播放、M2 中层旋转、搜索和移动端宽度。练习计时为日常计时，不含 WCA 比赛检查或罚时规则。

## 教学范围

完整库按状态去重核验：57 个 OLL（忽略 U 调整）、21 个 PLL（忽略 U 调整与 y 视角）、41 个 F2L（忽略 U 调整）。F2L 编号采用 Cubeathon 源站顺序，并非跨教程统一编号。完整直觉 F2L 仍建议结合参考视频练习找块与配对。OLL 的逆操作演示会最终得到完整复原，但实际 OLL 只保证顶面朝向正确，仍需 PLL。

参考资料（核对于 2026-11-17）：

- https://jperm.net/3x3/cfop
- https://jperm.net/algs/oll
- https://jperm.net/algs/pll
- https://cubeathon.com/algorithms/f2l
- https://jperm.net/algs/2lookoll
- https://jperm.net/algs/2lookpll
- https://cubeskills.com/uploads/pdf/tutorials/oll-algorithms.pdf
- https://cubeskills.com/uploads/pdf/tutorials/2-look-last-layer.pdf

中文解析、网页设计与状态演示独立编写，公式采用标准魔方记号。

完整公式数据来自 research/*-cases.json；执行 node build-catalog.mjs 生成 dist/catalog.js。动画统一黄底白顶起始握持，必要时在原公式末尾补回转体，并在解析注明。
