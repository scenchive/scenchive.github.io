import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const RecommendResult = () => {
  const [token, setToken] = useState<string | null>(null);
  const [querySearch, setQuerySearch] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  return null;
};

export default RecommendResult;
