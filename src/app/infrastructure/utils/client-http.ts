import { authOptions } from "../../api/auth/[...nextauth]/route";
import { DefaultSession, getServerSession } from "next-auth";

const defaultBaseUrl = "https://maintenancesystembc-production.up.railway.app/api/v1";

interface Session extends DefaultSession {
  user: {
      id?: string;
      token?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
  };
}
export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaultBaseUrl;
  }

  async get<T = any>(url: string, isBinary: boolean = false): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "GET",
      cache: "no-store",
    });
  
    if (isBinary) {
      return response.arrayBuffer() as unknown as T;
    }
  
    return this.handleResponse(response);
  }
  

  async post<T, B>(url: string, body: B, formData: boolean = false): Promise<T> {
    const headers = await this.getHeader(formData);
    console.log(body);
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "POST",
      body: formData ? body as FormData: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  async delete<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "DELETE",
    });

    return this.handleResponse(response);
  }

  async put<T, B>(url: string, body: B): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: headers,
      method: "PUT",
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  private async getHeader(formData: boolean = false) {
    const session = (await getServerSession(authOptions)) as Session | null;
  
    const headers: HeadersInit = {};

    if (formData === false) {
      headers["Content-Type"] = "application/json";
    }
  
    if (session?.user?.token) {
      headers["Authorization"] = `Bearer ${session.user.token}`;
    }
  
    return headers;
  }
  

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw errorData;
    }
    return await response.json();
  }
}