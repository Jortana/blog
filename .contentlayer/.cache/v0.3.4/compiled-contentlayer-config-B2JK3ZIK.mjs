// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { remark } from "remark";
import remarkHtml from "remark-html";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/*.md",
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    categories: { type: "list", of: { type: "string" }, required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    draft: { type: "boolean", default: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath.replace("posts/", "")}`
    },
    excerpt: {
      type: "string",
      resolve: async (post) => {
        const content = post.body.raw;
        let excerptContent = "";
        if (content.includes("<!-- more -->")) {
          ;
          [excerptContent] = content.split("<!-- more -->");
        } else {
          excerptContent = `${content.slice(0, 200)}...`;
        }
        const processedContent = await remark().use(remarkHtml).process(excerptContent);
        return processedContent.toString();
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-B2JK3ZIK.mjs.map
