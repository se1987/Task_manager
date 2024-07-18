import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const checkAuth = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).end();
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key") as jwt.JwtPayload;
    // Additional checks can be added here, e.g., fetching user data from Django backend
    return res.status(200).json({ userId: decoded.user_id });
  } catch (error) {
    return res.status(401).end();
  }
};

export default checkAuth;
