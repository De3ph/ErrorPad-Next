export type ErrorData = {
  date: string;
  data: Data;
};

export type Data = {
  date: Date;
  source: string;
  lang: string;
  code: string;
  message: string;
  line: number;
  user_email: string;
};
