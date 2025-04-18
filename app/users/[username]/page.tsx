import { UserProfilePage } from "@/components/user-profile-page"

export default function UserProfile({ params }: { params: { username: string } }) {
  return <UserProfilePage username={params.username} />
}
