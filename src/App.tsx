import { MotionConfig } from 'motion/react';
import { getModel } from './models';
import { useRoute } from './shared';
import { Gallery } from './Gallery';
import { LandingTemplate } from './Template';

export default function App() {
  const route = useRoute();
  const model = route ? getModel(route) : undefined;
  return (
    <MotionConfig reducedMotion="user">
      {model ? <LandingTemplate key={model.slug} model={model} /> : <Gallery />}
    </MotionConfig>
  );
}
