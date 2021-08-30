import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { store } from "../../../context/alert/AlerProvider";
import http from "../../../services/httpServices";

export default function useLoadData(
  query,
  page,
  url,
  params,
  notLoadOnInit,
  isSearching
) {
  const [listData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const { t } = useTranslation();
  const { dispatch } = useContext(store);

  useEffect(() => {
    setData([]);
  }, [params.searchFilter]);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await http.getRequest(url, {
        ...params,
        pageNumber: page,
      });
      if (data) {
        if (page === 0) {
          setData(data.entityList);
        } else {
          setData(prevData => {
            return [...prevData, ...data.entityList];
          });
        }
        setHasMore(data.entityList.length > 4);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.customMsg) {
        dispatch({ type: "OPEN_ERROR", payload: err.customMsg });
      } else {
        dispatch({ type: "OPEN_ERROR", payload: t("error") });
      }
      if (page === 0) {
        setData([]);
      }
    }
  };
  useEffect(() => {
    if (notLoadOnInit) {
      setLoading(false);
      if (isSearching) {
        getData();
      }
    } else {
      getData();
    }
  }, [query, page, isSearching]);

  return { listData, loading, hasMore };
}
