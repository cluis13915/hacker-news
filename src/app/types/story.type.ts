export interface Story {
  _id: string;
  by: string;
  title: string;
  url: string;
  time: number;
}

export interface StoriesResponse {
  data: Story[],
  count: number,
  page: number,
  size: number,
}