import { registerRoot, Composition } from 'remotion';
import { KevinPromoVideo } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KevinPromo"
        component={KevinPromoVideo}
        durationInFrames={1800} // 1800 frames / 30 fps = 60 seconds
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
