import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
const Home = lazy(() => import("../pages/Home"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const Favorites = lazy(() => import("../pages/Favorites"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Approutes = () => {
  return (
   <Suspense fallback={<div>Loading..</div>}>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
   </Suspense>
  );
};

export default Approutes;
