import Header from "@/components/Header";
import CardProgress from "@/components/CardProgress";
import Accordion from "@/components/Accordion";

import { findPhasesByProjectId } from "@/app/api/phases";
import { cryptography } from "@/utils/cryptography";
import { findEpicsByFaseIdAndProjectId } from "@/app/api/epic";
import { findFeaturesByFaseIdAndProjectId } from "@/app/api/feature";
import { fetchUserStoriesData } from "@/app/api/userStories";
import { findTasksByStoryIdAndProjectId } from "@/app/api/tasks";
import { onGetColorStatus } from "@/styles/color";
import Menu from "../partials/Menu";
import Feature from "../partials/Feature";

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
