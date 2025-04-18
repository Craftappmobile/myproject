import { Header } from "@/components/header"
import { EditYarnPage } from "@/components/edit-yarn-page"

export default function EditYarn({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <EditYarnPage id={params.id} />
    </main>
  )
}
