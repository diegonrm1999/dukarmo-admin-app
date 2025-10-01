export interface IAppConfig {
  baseURL: string;

  init: () => void;

}

export interface IAuthUser {
  token: string;
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
