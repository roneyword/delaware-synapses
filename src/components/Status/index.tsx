import { StatusContainer } from "./styles";

type StatusType = 1 | 2 | 3 | 4

interface StatusProps {
  status: StatusType
}

const onGetColor = (status: number) => {
  const colorMap: Record<string, { bg: string; color: string }> = {
    1: { bg: "#ACACAC", color: "#dfdede" },
    2: { bg: "#FFC000", color: "#FFF2CC" },
    3: { bg: "#C42828", color: "#F3D4D4" },
    4: { bg: "#45A49E", color: "#DAEDEC" },
  };

  return colorMap[status] || { bg: "", color: "" };
};

export default function Status({ status }: StatusProps) {
  console.log(onGetColor(status).color)
  console.log(onGetColor(status).bg)
  return (
    <StatusContainer $color={onGetColor(status).color} $bgColor={onGetColor(status).bg} />
  )
}