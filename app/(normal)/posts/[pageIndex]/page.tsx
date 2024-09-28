export default function Page({ params }: { params: { pageIndex: string } }) {
  const { pageIndex } = params

  return <>{pageIndex}</>
}
