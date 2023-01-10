export interface IBaseRepository {
  modelName: string;
}

export type TBaseRepository = IBaseRepository;

export abstract class BaseRepository implements TBaseRepository {
  public readonly modelName: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }
}
