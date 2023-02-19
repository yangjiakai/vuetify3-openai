// /{prefix}/{icon}.svg动态生成 SVG。
// /{prefix}.css?icons={icons}为图标动态生成 CSS。
// /{prefix}.json?icons={icons}检索图标数据。
// /last-modified?prefixes={prefixes}返回请求图标集的最后修改时间，可用于使旧图标数据缓存失效。
// 如果启用了图标列表，自定义图标选择器可以使用以下查询来浏览图标：

// /collections返回可用图标集的列表。
// /collection?prefix={prefix}返回图标集中的图标列表。
// 如果启用了搜索引擎，图标选择器可以使用这些查询来实现搜索功能：

// /search?query={keyword}返回匹配关键字的图标列表。
// /keywords?prefix={keyword}或/keywords?keyword={keyword}返回包含请求关键字的关键字列表，可用于自动完成。
// 维护查询：

// /version将 API 版本显示为纯文本，除非禁用。如果您正在运行多个 API 服务器，就像公共 Iconify API 一样，这可用于检查访问者连接到哪个服务器。
// /update从源更新图标集，无需重新启动 API。这可用于使用 GitHub 挂钩或类似方法自动使 API 保持最新。

const instance = axios.create({
  baseURL: "https://api.iconify.design/",
  timeout: 1000,
});

// List collections 返回可用图标集的列表。
export const getIconsApi = () => {
  return instance.get("/collections");
};

// Get a collection 获取图标集信息。
export const getIconApi = (prefix: string | string[]) => {
  return instance.get("/collections/" + prefix);
};

// Get a collection’s icons 返回图标集中的图标列表。
export const getIconIconsApi = (prefix: string | string[]) => {
  return instance.get("/collection?prefix=" + prefix);
};

// Search for icons 返回匹配关键字的图标列表。
export const getIconSearchApi = (query: string | string[]) => {
  return instance.get("/search?query=" + query);
};

// Get keywords 返回包含请求关键字的关键字列表，可用于自动完成。
export const getIconKeywordsApi = (query: string | string[]) => {
  return instance.get("/keywords?keyword=" + query);
};
