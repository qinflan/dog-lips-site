import UpdateShow from "@/components/UpdateShow";
import { useParams } from "react-router";

const ManageShow = () => {
    const { id } = useParams<{ id: string }>();

  return (
    <UpdateShow showId={Number(id)} />
  )
}

export default ManageShow