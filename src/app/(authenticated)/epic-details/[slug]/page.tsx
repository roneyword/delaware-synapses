import Header from "@/components/Header";
import { cryptography } from "@/utils/cryptography";
import Menu from "../partials/Menu";
import { findPhasesByProjectId } from "@/actions/phases";
import { findEpicsByFaseIdAndProjectId } from "@/actions/epic";

interface EpicDetailsProps {
  params: { slug: string };
}

export default async function EpicDetails({ params }: EpicDetailsProps) {
  const decript = JSON.parse(cryptography.decript(params.slug));

  const responsePhases = await findPhasesByProjectId(decript.project);

  let responseEpics;

  if (responsePhases && Array.isArray(responsePhases)) {
    const epicPromises = responsePhases.map(async (phase) => {
      const epics = await findEpicsByFaseIdAndProjectId(
        phase.phaseId,
        decript.project
      );
      return epics;
    });

    const allEpicsNested = await Promise.all(epicPromises);

    responseEpics = allEpicsNested.flat();
  }

  return (
    <>
      <Header title="Epic Details" />
      <Menu token={params.slug} phases={responsePhases} epics={responseEpics} />
    </>
  );
}
