interface ControlCenterProps {
  params: { projectUuid: string }
}

export default function ControlCenter({ params }: ControlCenterProps) {
  return <div>projectUuid: {params.projectUuid}</div>
}