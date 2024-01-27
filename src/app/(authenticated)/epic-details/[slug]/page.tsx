interface EpicDetailsProps {
  params: { slug: string }
}

export default function EpicDetails({ params }: EpicDetailsProps) {
  return <div>EpicDetailsProps: {params.slug}</div>
}