export interface Article {
  uri: string;
  dateTime: string;
  url: string;
  title: string;
  body: string;
  image: string;
  source: {
    title: string;
    uri: string;
    image?: string;
  };
  categories: { label: string }[];
}
