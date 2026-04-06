import { registerRoot, Composition } from 'remotion';
import { KevinPromoVideo } from './Composition';
import { DailyReport } from './demos/DailyReport';
import { SystemArchitecture } from './demos/SystemArchitecture';
import { ProjectCollaboration } from './demos/ProjectCollaboration';
import { AudioVisualizer } from './demos/AudioVisualizer';
import { ThreeDScene } from './demos/ThreeDScene';
import { GlobeDataFlow } from './demos/GlobeDataFlow';
import { ScrollSimulation } from './demos/ScrollSimulation';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="KevinPromo" component={KevinPromoVideo} durationInFrames={1800} fps={30} width={1920} height={1080} />
      <Composition id="DailyReport" component={DailyReport} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="SystemArchitecture" component={SystemArchitecture} durationInFrames={600} fps={30} width={1920} height={1080} />
      <Composition id="ProjectCollaboration" component={ProjectCollaboration} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="AudioVisualizer" component={AudioVisualizer} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="ThreeDScene" component={ThreeDScene} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="GlobeDataFlow" component={GlobeDataFlow} durationInFrames={450} fps={30} width={1920} height={1080} />
      <Composition id="ScrollSimulation" component={ScrollSimulation} durationInFrames={450} fps={30} width={1920} height={1080} />
    </>
  );
};

registerRoot(RemotionRoot);
