import { allPosts } from '@/.contentlayer/generated'

export default async function Home() {
  console.log(allPosts)
  return (
    <div>
      <h1 className="text-xl">Home</h1>
    </div>
  )
}
