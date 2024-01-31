export const onGetColorStatus = (status: number) => {
  const colorMap: Record<string, { bg: string; color: string }> = {
    1: { bg: "#ACACAC", color: "#dfdede" },
    2: { bg: "#FFC000", color: "#FFF2CC" },
    3: { bg: "#C42828", color: "#F3D4D4" },
    4: { bg: "#45A49E", color: "#DAEDEC" },
  };

  return colorMap[status] || { bg: "", color: "" };
};

export const onGetColor = (phase: string) => {
  const colorMap: Record<string, { bg: string; color: string }> = {
    prepare: { bg: "#a5b3c5", color: "#69809f" },
    explore: { bg: "#f4b183", color: "#ed7d31" },
    realize: { bg: "#a9d18e", color: "#70AD47" },
    deploy: { bg: "#f66", color: "#FF0000" },
    run: { bg: "#ab74d5", color: "#7030A0" },
  };

  return colorMap[phase.toLocaleLowerCase()] || { bg: "", color: "" };
};