export interface IAppConfig {
  baseURL: string;
  accessToken: string;

  init: (params: { accessToken: string }) => void;

  props: {
    accessToken: (config: IAppConfig) => string;
  };
}

export interface IAuthUser {
  access_token: string;
  id: string;
  role: string;
  name: string;
}

export type Field = {
  name: string;
  placeholder: string;
  label: string;
};

export type FieldMap = {
  [key: string]: Field[];
};

export type ToastSeverity = "success" | "error";

export type ToastInfo = {
  message: string;
  status: ToastSeverity;
};
