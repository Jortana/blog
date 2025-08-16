import { PostList } from '@/app/components/post-list'
import MainLayout from '@/app/components/main-layout'

export default function NormalLayout({ children }: React.PropsWithChildren) {
  return <MainLayout left={<PostList />} main={children} />
}
