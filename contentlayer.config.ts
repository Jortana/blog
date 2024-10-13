import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import { readingTime } from 'reading-time-estimator'

const ReadingTime = defineNestedType(() => ({
  name: 'ReadingTime',
  fields: {
    text: { type: 'string' },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    headerImage: { type: 'string', required: false },
    draft: { type: 'boolean', default: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) =>
        `/post/${post._raw.flattenedPath.replace('posts/', '')}`,
    },
    excerpt: {
      type: 'string',
      resolve: async (post) => {
        const content = post.body.raw

        // 检查是否包含标识，如果有则截取标识前的内容，否则截取前 200 个字符
        const moreRegex = /<!-- more -->|{\/\* more \*\/}/
        const excerptContent =
          content.split(moreRegex)[0] || `${content.slice(0, 200)}...`

        // 将 Markdown 转换为纯文本，去除 Markdown 格式符号
        const plainTextExcerpt = excerptContent
          .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
          .replace(/\[([^\]]+)\]\((.*?)\)/g, '$1') // 移除链接但保留链接文本
          .replace(/[`*_{}[\]()#+\-.!]/g, '') // 移除其他 Markdown 格式符号
          .replace(/\n/g, ' ') // 将换行符替换为空格
          .trim()

        return plainTextExcerpt
      },
    },
    headerImage: {
      type: 'string',
      resolve: (post) => {
        // 如果手动指定了 headerImage，就使用它
        if (post.headerImage) return post.headerImage

        // 使用正则表达式匹配 Markdown 中的第一张图片
        const imageRegex = /!\[.*?\]\((.*?)\)/
        const match = post.body.raw.match(imageRegex)
        return match ? match[1] : null // 返回匹配到的图片 URL，或 null
      },
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('posts/', ''),
    },
    readingTime: {
      type: 'nested',
      of: ReadingTime,
      resolve: (post) => {
        const stats = readingTime(post.body.raw, 400, 'cn')

        const minutes = Math.ceil(stats.minutes) // 取整分钟数

        // 根据分钟数显示中文格式的阅读时间
        if (minutes <= 1) {
          return { text: '大约需要 1 分钟阅读' }
        }

        return { text: `大约需要 ${minutes} 分钟阅读` }
      },
    },
  },
}))

export const Thought = defineDocumentType(() => ({
  name: 'Thought',
  filePathPattern: 'thoughts/*.md',
  contentType: 'markdown',
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Thought],
})
