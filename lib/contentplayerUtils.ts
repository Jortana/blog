import { allPosts } from '@/.contentlayer/generated'

/**
 * 获取所有文章的数量
 */
export function getTotalPostCount(): number {
  return allPosts.length
}

/**
 * 获取所有分类和数量
 */
export function getAllCategories() {
  const categoriesSet = new Set<string>()

  for (const post of allPosts) {
    categoriesSet.add(post.category)
  }

  return {
    categories: Array.from(categoriesSet),
    count: categoriesSet.size,
  }
}

/**
 * 获取所有标签的数量
 */
export function getAllTags() {
  const tagsSet = new Set<string>()

  for (const post of allPosts) {
    for (const tag of post.tags) {
      tagsSet.add(tag)
    }
  }

  return {
    tags: Array.from(tagsSet),
    count: tagsSet.size,
  }
}

/**
 * 返回分页的文章
 */
export function getPosts(page = 1, pageSize = 5) {
  // 过滤掉草稿文章并按日期排序
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 计算总页数
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / pageSize)

  // 获取当前页的数据
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pagePosts = posts.slice(start, end)

  return {
    page,
    pageSize,
    totalPosts,
    totalPages,
    posts: pagePosts,
  }
}

export function getPost(id: string) {
  const post = allPosts.find((post) => post._id === id)

  return post
}
