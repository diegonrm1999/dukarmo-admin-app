import { IAppConfig } from "@/config/types";

export const config: IAppConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",

  init() {},
};
