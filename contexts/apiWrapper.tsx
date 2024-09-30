import { createContext } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

interface TokenRefresherContextValues {
  makeRequest: (route: string, options: RequestOptions) => Promise<any>;
}

interface RequestOptions {
  method?: string;
  params?: Record<string, any>;
  data?: any;
}

const backendURL = process.env.NEXT_PUBLIC_MY_BACKEND_URL;

const TokenRefresherContext = createContext<TokenRefresherContextValues | null>(
  null,
);

const TokenRefresherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("Missing refresh token");
      }

      const response = await axios.post(
        `${backendURL}/api/auth/refresh-token`,
        {
          refreshToken,
        },
      );
      if (response.status !== 200) {
        throw new Error("Failed to refresh access token");
      }
      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  const makeRequest = async (route: string, options: RequestOptions) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Missing access token");
      }

      const response = await axios.request({
        url: `${backendURL}${route}`,
        method: options.method || "GET",
        params: options.params || {},
        data: options.data || {},
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data || null;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const refreshedAccessToken = await refreshAccessToken();
          localStorage.setItem("accessToken", refreshedAccessToken);

          const response = await axios.request({
            ...options,
            headers: {
              Authorization: `Bearer ${refreshedAccessToken}`,
            },
          });
          return response.data || null;
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);
          redirect("/signin");
        }
      } else {
        console.error("API request error:", error);
        throw error;
      }
    }
  };

  return (
    <TokenRefresherContext.Provider value={{ makeRequest }}>
      {children}
    </TokenRefresherContext.Provider>
  );
};

export { TokenRefresherContext, TokenRefresherProvider };
