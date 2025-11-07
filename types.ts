
export enum GeneratorMode {
  VIDEO = 'video',
  IMAGE = 'image',
}

export interface VideoOperation {
  name: string;
  done: boolean;
  response?: {
    generatedVideos?: {
      video?: {
        uri: string;
      };
    }[];
  };
}
