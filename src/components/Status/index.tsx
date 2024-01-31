import { onGetColorStatus } from "@/styles/color";
import { StatusContainer } from "./styles";

type StatusType = 1 | 2 | 3 | 4

interface StatusProps {
  status: StatusType
}



export default function Status({ status }: StatusProps) {
  return (
    <StatusContainer $color={onGetColorStatus(status).color} $bgColor={onGetColorStatus(status).bg} />
  )
}