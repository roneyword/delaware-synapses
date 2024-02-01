import Card from "@/components/Card";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import CardProgress from "@/components/CardProgress";
import ProgressBar from "@/components/ProgressBar";
import Accordion from "@/components/Accordion";
import iconPast from "@/assets/icons/cc-project.svg";

import {
  HeaderDetailsContainer,
  FeatureContainer,
} from "./styles";

import { findPhasesByProjectId } from "@/app/api/phases";
import { cryptography } from "@/utils/cryptography";
import { findEpicsByFaseIdAndProjectId } from "@/app/api/epic";
import { findFeaturesByFaseIdAndProjectId } from "@/app/api/feature";
import { fetchUserStoriesData } from "@/app/api/userStories";
import { findTasksByStoryIdAndProjectId } from "@/app/api/tasks";
import Legend from "@/components/legend";
import { onGetColorStatus } from "@/styles/color";

interface EpicDetailsProps {
  params: { slug: string };
}

const iconFeatureStatus = (color: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="68px"
    height="68px"
    viewBox="0 0 68 68"
    version="1.1"
  >
    <g id="surface1">
      <path
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "rgb(100%,100%,100%)",
          fillOpacity: 1,
        }}
        d="M 0 34 C 0 15.222656 15.222656 0 34 0 C 52.777344 0 68 15.222656 68 34 C 68 52.777344 52.777344 68 34 68 C 15.222656 68 0 52.777344 0 34 Z M 0 34 "
      />
      <path
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: color,
          fillOpacity: 1,
        }}
        d="M 43.351562 34.4375 C 42.007812 35.816406 40.742188 36.699219 37.980469 37.007812 C 38.707031 36.277344 39.554688 35.550781 40.28125 34.667969 C 40.589844 34.320312 41.164062 33.554688 41.164062 33.515625 C 41.816406 32.441406 42.199219 31.214844 42.199219 29.871094 L 42.199219 24.882812 L 44.886719 24.882812 L 44.886719 30.714844 C 44.925781 30.792969 45 32.710938 43.351562 34.4375 Z M 24.28125 34.4375 C 22.59375 32.710938 22.671875 30.792969 22.671875 30.714844 L 22.671875 24.84375 L 25.355469 24.84375 L 25.355469 29.832031 C 25.355469 31.175781 25.742188 32.402344 26.390625 33.476562 C 26.390625 33.515625 26.96875 34.320312 27.273438 34.628906 C 28.042969 35.511719 28.847656 36.238281 29.578125 36.96875 C 26.890625 36.660156 25.585938 35.78125 24.28125 34.4375 Z M 47.226562 30.597656 L 47.226562 22.542969 L 42.238281 22.542969 L 42.238281 19.855469 L 25.355469 19.855469 L 25.355469 22.542969 L 20.367188 22.542969 L 20.367188 30.5625 C 20.367188 30.945312 20.367188 33.59375 22.554688 35.933594 C 24.664062 38.15625 27.238281 39.308594 31.726562 39.386719 C 32.070312 39.960938 32.261719 40.613281 32.261719 41.304688 L 32.261719 46.292969 L 30.34375 46.292969 C 29.5 46.292969 28.808594 46.980469 28.808594 47.828125 L 26.890625 47.828125 C 26.046875 47.828125 25.355469 48.519531 25.355469 49.359375 L 25.355469 50.128906 L 42.238281 50.128906 L 42.238281 49.359375 C 42.238281 48.519531 41.546875 47.828125 40.703125 47.828125 L 38.785156 47.828125 C 38.785156 46.980469 38.09375 46.292969 37.25 46.292969 L 35.332031 46.292969 L 35.332031 41.34375 C 35.332031 40.648438 35.523438 40 35.871094 39.425781 C 40.359375 39.347656 42.929688 38.15625 45.039062 35.972656 C 47.226562 33.667969 47.226562 30.984375 47.226562 30.597656 Z M 47.226562 30.597656 "
      />
    </g>
  </svg>
);

export default async function EpicDetails({ params }: EpicDetailsProps) {
  const decript = JSON.parse(cryptography.decript(params.slug));

  const responsePhases = await findPhasesByProjectId(decript.project);

  const responseEpics = await findEpicsByFaseIdAndProjectId(
    decript.phaseId,
    decript.project
  );

  const responseFeature =
    responseEpics &&
    (await findFeaturesByFaseIdAndProjectId(
      responseEpics[0].epicId,
      decript.project
    ));

  const onGetPhase = async () => {
    const phase = responsePhases?.find((phase) => phase.phaseId === decript.phaseId);
    if (phase) {
      return (
        <CardProgress
          title={phase?.title}
          completeWork={phase?.completeWork}
          percentComplete={phase?.percentComplete}
          name={phase?.name}
          totalWork={phase?.totalWork}
        />
      );
    }

  };

  const onGetEpic = async () => {
    if (responseEpics) {
      return (
        <ProgressBar
          title="Epic"
          step={responseEpics[0].step}
          name={responseEpics[0].name}
          phase={decript.phaseName}
          plannedDate={responseEpics[0].plannedDate}
          completeWork={responseEpics[0].completeWork}
          totalWork={responseEpics[0].totalWork}
          percentComplete={responseEpics[0].percentComplete}
        />
      );
    }
  };

  const onGetFeature = () => {
    if (responseFeature) {
      return responseFeature.map((feature) => {
        return (
          <div className="card-details">
            <CardProgress
              key={feature.almId}
              completeWork={feature.completeWork}
              workTitle={feature.title}
              percentComplete={feature.percentComplete}
              name={feature.status.id}
              totalWork={feature.totalWork}
              icon={iconFeatureStatus(onGetColorStatus(feature.status.id).bg)}
            />
            {getUserStorie(feature.featureId, 2)}
          </div>
        );
      });
    }

    return null;
  };

  const getUserStorie = async (featureId: number, status: number) => {
    const responseUserStorie = await fetchUserStoriesData(
      featureId,
      decript.project
    );

    if (responseUserStorie) {
      const accordion = await Promise.all(
        responseUserStorie.map(async (user) => {
          const tasks = await getTasks(user.userStoryId, user.title);
          return <Accordion status={user.status.id} items={tasks} />;
        })
      );

      return accordion
    }

    return null
  };

  const getTasks = async (userStoryId: number, titleUser: string): Promise<any> => {
    const responseTasks = await findTasksByStoryIdAndProjectId(
      userStoryId,
      decript.project
    );

    return [{ content: responseTasks, title: titleUser }]
  };

  return (
    <>
      <Header title="Epic Details" />

      <HeaderDetailsContainer>
        <Wrapper>
          <Card
            link={`/control-center/${decript.project}`}
            title="Control Center"
            text="Back to Dashboard"
            icon={iconPast}
          />
        </Wrapper>
        <Wrapper>
          {onGetPhase()}
          {onGetEpic()}
        </Wrapper>
        <Wrapper> <Legend /></Wrapper>
      </HeaderDetailsContainer>

      <Wrapper>
        <FeatureContainer>
          {onGetFeature()}
        </FeatureContainer>
      </Wrapper>
    </>
  );
}
