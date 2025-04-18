import type { Metadata } from "next"
import { GroupPage } from "@/components/group-page"

export const metadata: Metadata = {
  title: "Група | В'язальний калькулятор",
  description: "Перегляд групи спільноти",
}

export default function Group({ params }: { params: { id: string } }) {
  return <GroupPage groupId={params.id} />
}
