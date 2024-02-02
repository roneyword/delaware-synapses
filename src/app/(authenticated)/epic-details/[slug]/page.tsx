import Header from "@/components/Header";
import { cryptography } from "@/utils/cryptography";
import Menu from "../partials/Menu";
import { findPhasesByProjectId } from "@/actions/phases";
import { findEpicsByFaseIdAndProjectId } from "@/actions/epic";
import { findFeaturesByFaseIdAndProjectId } from "@/actions/feature";

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

  // const feature = findFeaturesByFaseIdAndProjectId(responseEpics[0]phaseId, .decript.project)


  // const responseEpics = await findEpicsByFaseIdAndProjectId(
  //   decript.phaseId,
  //   decript.project
  // );

  // const responseFeature =
  //   responseEpics &&
  //   (await findFeaturesByFaseIdAndProjectId(
  //     responseEpics[0].epicId,
  //     decript.project
  //   ));

  return (
    <>
      <Header title="Epic Details" />
      <Menu token={params.slug} phases={responsePhases} epics={responseEpics} />
      {/* <Feature token={decript} feature={responseFeature} /> */}
    </>
  );
}
