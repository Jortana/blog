import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    categories: { type: 'list', of: { type: 'string' }, required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    draft: { type: 'boolean', default: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) =>
        `/posts/${post._raw.flattenedPath.replace('posts/', '')}`,
    },
    excerpt: {
      type: 'string',
      resolve: async (post) => {
        const content = post.body.raw

        // 检查是否包含标识
        let excerptContent = ''
        if (content.includes('<!-- more -->')) {
          ;[excerptContent] = content.split('<!-- more -->')
        } else {
          // 如果没有标识，截取前 200 个字符
          excerptContent = `${content.slice(0, 200)}...`
        }

        // 将 Markdown 转换为 HTML
        const processedContent = await remark()
          .use(remarkHtml)
          .process(excerptContent)

        return processedContent.toString()
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
})
