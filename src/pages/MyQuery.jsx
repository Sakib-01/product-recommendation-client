import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const MyQuery = () => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState(null);
  useEffect(() => {
    fetchQueryData();
  }, [user?.email]);

  const fetchQueryData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/my-query/${user?.email}`
    );
    setQuery(data);
  };
  console.log(query);
  return (
    <div>
      <h2>my queries{query.length}</h2>
    </div>
  );
};

export default MyQuery;
