import { IAppConfig } from "@/config/types";
import { OrderFilters, OrdersResponse } from "@/lib/types/order";
import { Role, User } from "@/lib/types/user";
import { config } from "@/config/common";
import { ClientFilters, ClientsResponse } from "@/lib/types/client";

class ApiClient {
  private baseURL: string;
  private token: string;

  constructor(config: IAppConfig) {
    this.baseURL = config.baseURL;
    this.token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZjY4OTVkMS1hNjE3LTRlMzMtYWFjNS0zMDZlYjBmNzdiYjgiLCJlbWFpbCI6ImRpZWdvQGR1a2FybW8uY29tIiwicm9sIjoiTWFuYWdlciIsInNob3BJZCI6IjAwMzI5NzliLTczZWMtNGZhZS1hYWJiLThmZGIzYzdiODQwMCIsImlhdCI6MTc1NzcxOTc3NCwiZXhwIjoxNzU3ODA2MTc0fQ.kCikLrISZrdrSbCYSXBNrzIf9IEZ_WwKlWrhHYGbvXU";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.token;

    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
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

const api = () => new ApiClient(config);
export default api;
