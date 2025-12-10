import { useParams } from "wouter";
import CreateOrder from "./CreateOrder";

export default function EditOrder() {
  const params = useParams<{ id: string }>();
  return <CreateOrder orderId={params.id} />;
}
