export interface IBreed {
  weight: {
    imperial: string;
    metric: string;
  };
  image: ICatImage;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  description: string;
  country_code: string;
  life_span: string;

  indoor: string;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  lap: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  hypoallergenic: number;

  wikipedia_url: string;
  reference_image_id: string;
}

export interface ICatImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface ICatState{
  breeds: IBreed[];
  currentCatsArray: ICatImage[];
  formParams: IFormParams;
  total: number;
}

export interface IFormParams {
  order: string;
  breed: string;
}

export interface IPaginationParams {
  page: number;
  limit: number;
}
