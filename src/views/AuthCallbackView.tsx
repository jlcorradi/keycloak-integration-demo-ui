import { useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import axios from "axios";

interface AuthCallbackViewProps {}

export const AuthCallbackView = (props: AuthCallbackViewProps) => {
  const query = useQuery();
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    setCode(query.get("code") || "");
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const url = import.meta.env.VITE_AUTH_TOKEN_URL;

      const data = new URLSearchParams();
      data.append("grant_type", "authorization_code");
      data.append("client_id", import.meta.env.VITE_AUTH_CLIENT_ID);
      data.append("client_secret", import.meta.env.VITE_AUTH_CLIENT_SECRET);
      data.append("code", code);
      data.append("redirect_uri", import.meta.env.VITE_AUTH_REDIRECT_URL);

      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });
        console.log("Response:", response.data);

        const helloResponse = axios.get<string>("/api/v1/hello", {
          headers: { Authorization: `Bearer ${response.data?.access_token}` },
        });

        console.log((await helloResponse).data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (code) {
      fetchData();
    }
  }, [code]);

  console.log(props);
  return (
    <>
      <div>Auth Callback</div>
      <p>Code: {query.get("code")}</p>
      <p>
        <a href="/api/logout">Logout</a>
      </p>
    </>
  );
};
