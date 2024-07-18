import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.post(
      "http://localhost:8000/accounts/logout/",
      req.body,
      {
        withCredentials: true, // クッキーの送信を許可
      }
    );
    res.status(200).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("ログアウトエラー:", axiosError.message);
      res
        .status(axiosError.response?.status || 500)
        .json({ error: "ログアウトエラーが発生しました。" });
    } else {
      console.error("未知のエラー:", error);
      res.status(500).json({ error: "エラーが発生しました。" });
    }
  }
}
