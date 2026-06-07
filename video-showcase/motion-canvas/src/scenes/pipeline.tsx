import {makeScene2D, Rect, Txt, Line, Circle} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#05070d');

  const title = createRef<Txt>();
  const packet = createRef<Rect>();

  view.add(
    <>
      <Txt
        ref={title}
        text={'TypeScript can choreograph the pipeline.'}
        x={0}
        y={-650}
        width={860}
        fontFamily={'Inter, Arial'}
        fontWeight={800}
        fontSize={76}
        fill={'#f8fafc'}
        textWrap
      />
      <Line points={[[0, -260], [0, 500]]} stroke={'#26384a'} lineWidth={12} />
      <Circle x={0} y={-260} width={120} height={120} stroke={'#2dd4bf'} lineWidth={8} />
      <Circle x={0} y={0} width={120} height={120} stroke={'#38bdf8'} lineWidth={8} />
      <Circle x={0} y={260} width={120} height={120} stroke={'#f59e0b'} lineWidth={8} />
      <Circle x={0} y={500} width={120} height={120} stroke={'#e2e8f0'} lineWidth={8} />
      <Rect ref={packet} x={0} y={-260} width={58} height={58} radius={10} fill={'#2dd4bf'} />
      <Txt text={'Best fit: code-driven vector explainers.'} y={720} fontSize={34} fill={'#c7d2fe'} />
    </>,
  );

  title().opacity(0);
  packet().scale(0);
  yield* all(title().opacity(1, 0.5), title().y(-610, 0.5), packet().scale(1, 0.35));
  yield* packet().y(500, 2.4);
  yield* waitFor(1.2);
});
