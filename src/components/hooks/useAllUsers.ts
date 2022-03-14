/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../../types/api/user";
import { useMessage } from "./useMessage";

export const useAllUsers = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      // userのAPIを取得
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      // state管理
      .then((res) => setUsers(res.data))
      .catch(() => {
        // トーストコンポーネント
        showMessage({ title: "ユーザー取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { getUsers, users, loading };
};
