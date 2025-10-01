import { IAppConfig } from "@/config/types";
import { OrderFilters, OrdersResponse } from "@/lib/types/order";
import { LoginResponse, Role, User } from "@/lib/types/user";
import { config } from "@/config/common";
import { ClientFilters, ClientsResponse } from "@/lib/types/client";
import { DashboardStats } from "@/lib/types/stats";

class ApiClient {
  private baseURL: string;

  constructor(config: IAppConfig) {
    this.baseURL = config.baseURL;
  }

  private async getAuthHeaders(requireAuth = true): Promise<HeadersInit> {
    return {
      "Content-Type": "application/json",
      // No pongas Authorization aquí si vas a usar cookies HttpOnly
    };
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requireAuth = true
  ): Promise<T> {
    const headers = await this.getAuthHeaders(requireAuth);
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  async login(email: string, password: string) {
    return this.request<LoginResponse>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
      false
    );
  }

  async getOrders(filters: OrderFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    return this.request<OrdersResponse>(
      `/orders${queryString ? `?${queryString}` : ""}`
    );
  }

  async getStats() {
    return this.request<DashboardStats>("/dashboard/stats");
  }

  async getUsersByRole(role: Role) {
    const endpoints = {
      [Role.Stylist]: "/users/stylists",
      [Role.Cashier]: "/users/cashiers",
      [Role.Operator]: "/users/operators",
      [Role.Manager]: "/users/managers",
    };
    return this.request<User[]>(`${endpoints[role]}?strict=true`);
  }

  async getStylists(strict?: boolean) {
    return this.request<User[]>(`/users/stylists`);
  }

  async getCashiers(strict?: boolean) {
    const params = strict ? "?strict=true" : "";
    return this.request<User[]>(`/users/cashiers${params}`);
  }

  async getOperators(strict?: boolean) {
    const params = strict ? "?strict=true" : "";
    return this.request<User[]>(`/users/operators${params}`);
  }

  async getManagers() {
    return this.request<User[]>("/users/managers");
  }

  async getClients(filters: ClientFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    return this.request<ClientsResponse>(
      `/clients${queryString ? `?${queryString}` : ""}`
    );
  }
}

const api = new ApiClient(config);
export default () => api;
