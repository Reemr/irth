export type Gallery = {id: string; image: string; detailId: string};

export type GalleryDocument = {image: string};

export type InitialStateGallery = {
  isLoading: boolean;
  data: Gallery[] | null;
  error: string | null;
};

export type Location = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  image: string;
  totalArtifacts: number;
};

export type InitialStateLocation = {
  isLoading: boolean;
  data: Location[] | null;
  error: string | null;
};

export type ArtifactDetails = {
  id: string;
  engTitle: string;
  engDescription: string;
  arTitle: string;
  arDescription: string;
  image: string;
};

export type InitialStateArtifactDetails = {
  isLoading: boolean;
  data: ArtifactDetails | null;
  error: string | null;
};
