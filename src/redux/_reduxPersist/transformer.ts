import {createTransform} from 'redux-persist';

export const mapTransformer = (config: any) =>
  createTransform(
    (map: any) => JSON.stringify(Array.from(map)),
    arrayString => new Map(JSON.parse(arrayString)),
    config,
  );
