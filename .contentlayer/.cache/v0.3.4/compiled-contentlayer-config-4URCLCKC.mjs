// contentlayer.config.ts
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";
import { readingTime } from "reading-time-estimator";
var ReadingTime = defineNestedType(() => ({
  name: "ReadingTime",
  fields: {
    text: { type: "string" }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/*.md",
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    category: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    headerImage: { type: "string", required: false },
    draft: { type: "boolean", default: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/post/${post._raw.flattenedPath.replace("posts/", "")}`
    },
    excerpt: {
      type: "string",
      resolve: async (post) => {
        const content = post.body.raw;
        const excerptContent = content.split("<!-- more -->")[0] || `${content.slice(0, 200)}...`;
        const plainTextExcerpt = excerptContent.replace(/!\[.*?\]\(.*?\)/g, "").replace(/\[([^\]]+)\]\((.*?)\)/g, "$1").replace(/[`*_{}[\]()#+\-.!]/g, "").replace(/\n/g, " ").trim();
        return plainTextExcerpt;
      }
    },
    headerImage: {
      type: "string",
      resolve: (post) => {
        if (post.headerImage)
          return post.headerImage;
        const imageRegex = /!\[.*?\]\((.*?)\)/;
        const match = post.body.raw.match(imageRegex);
        return match ? match[1] : null;
      }
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("posts/", "")
    },
    readingTime: {
      type: "nested",
      of: ReadingTime,
      resolve: (post) => {
        const stats = readingTime(post.body.raw, 400, "cn");
        const minutes = Math.ceil(stats.minutes);
        if (minutes <= 1) {
          return { text: "\u5927\u7EA6\u9700\u8981 1 \u5206\u949F\u9605\u8BFB" };
        }
        return { text: `\u5927\u7EA6\u9700\u8981 ${minutes} \u5206\u949F\u9605\u8BFB` };
      }
    }
  }
}));
var Thought = defineDocumentType(() => ({
  name: "Thought",
  filePathPattern: "thoughts/*.md",
  contentType: "markdown"
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Thought]
});
export {
  Post,
  Thought,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-4URCLCKC.mjs.map
