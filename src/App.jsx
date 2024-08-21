import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { Loader } from './components/Loader/Loader';
import Navigation from './components/Navigation/Navigation';

const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))


function App() {
  return (
    <>
      <Navigation />
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/movies' element={<MoviesPage />}/>
              <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
                <Route path='cast' element={<MovieCast />}/>
                <Route path='reviews' element={<MovieReviews />} />
              </Route>
              <Route path='*' element={<NotFoundPage />}></Route>
            </Routes>
          </Suspense>
        </main>
    </>
  )
}

export default App
