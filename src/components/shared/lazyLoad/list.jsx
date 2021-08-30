import React, { useState, useRef, useCallback, useEffect } from "react";
import useLoadData from "./useLoadData";
import EmptyPage from "../emptyPage/emptyPage";
// import Loading from "../loading/loading";
// import SkeletonLoading from "../skeletonLoaing/skeletonLoading";

const LazyList = ({
  url,
  searchdata,
  component: Component,
  params,
  notLoadOnInit,
  isSearching,
}) => {
  const [page, setPage] = useState(0);

  const { listData, hasMore, loading } = useLoadData(
    searchdata,
    page,
    url,
    params,
    notLoadOnInit,
    isSearching
  );
  const observer = useRef(); // refrence to last element
  useEffect(() => {
    setPage(0);
  }, [params.searchFilter]);
  const lastDataElement = useCallback(
    node => {
      if (loading) {
        return;
      }
      if (observer.current) {
        // disconnect out observer from previous elemtnt
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      // age last element darim
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );
  return (
    <>
      {listData &&
        listData.map((listItem, index) => {
          if (listData.length === index + 1) {
            return (
              <div key={listItem.id} ref={lastDataElement}>
                <Component listItem={listItem} loading={loading} />
              </div>
            );
          } else {
            return (
              <div key={listItem.id}>
                <Component listItem={listItem} loading={loading} />
              </div>
            );
          }
        })}

      {loading && <Component loading={loading} />}
      {!loading && listData && listData.length === 0 && <EmptyPage />}
    </>
  );
};

export default LazyList;
