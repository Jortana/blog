import MainLayout from '@/app/components/main-layout'
import { PostList } from '@/app/components/post-list'

export default function NormalLayout({ children }: React.PropsWithChildren) {
  return <MainLayout left={<PostList />} main={children} />
}
