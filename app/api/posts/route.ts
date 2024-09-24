// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { allPosts } from '@/.contentlayer/generated'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pageParam = searchParams.get('page') || '1'
  const pageSizeParam = searchParams.get('pageSize') || '5'

  const page = Number.parseInt(pageParam)
  const pageSize = Number.parseInt(pageSizeParam)

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

  // 返回分页数据
  return NextResponse.json({
    page,
    pageSize,
    totalPosts,
    totalPages,
    posts: pagePosts.map((post) => ({
      title: post.title,
      date: post.date,
      url: post.url,
      excerpt: post.excerpt || '',
    })),
  })
}
