import React from "react";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/accounts/logout/", {
        method: "GET", // ログアウトリクエストを GET メソッドで送信
        credentials: "include", // 必要に応じて cookie を含める
      });
      if (response.ok) {
        // ログアウトが成功した場合、ホームページにリダイレクト
        window.location.href = "http://localhost:8000/accounts/login/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
