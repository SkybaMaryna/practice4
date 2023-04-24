// import { Component } from 'react';
// import { MoviesGallery } from './MoviesGallery/MoviesGallery';
// import { Modal } from './Modal/Modal';
// import { fetchMovies } from 'services/moviesAPI';
// import { Button } from 'components/button/Button';
// import { Loader } from './Loader/Loader';

// export class App extends Component {
//   state = {
//     movies: [],
//     currentPoster: null,
//     isListShown: false,
//     page: 1,
//     isLoading: false,
//     error: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { isListShown, page } = this.state;
//     if (
//       (prevState.isListShown !== isListShown || prevState.page !== page) &&
//       isListShown
//     ) {
//       this.getMovies();
//     }
//     if (prevState.isListShown !== this.state.isListShown && !isListShown) {
//       this.setState({ movies: [], page: 1 });
//     }
//   }

//   handleDelete = id => {
//     this.setState(prevState => {
//       return { movies: prevState.movies.filter(movie => movie.id !== id) };
//     });
//   };

//   openModal = data => {
//     this.setState({ currentPoster: data });
//   };

//   closeModal = () => {
//     this.setState({ currentPoster: null });
//   };

//   toggleList = () => {
//     const { isListShown } = this.state;
//     this.setState({ isListShown: !isListShown });
//   };

//   getMovies = () => {
//     this.setState({ isLoading: true });
//     fetchMovies(this.state.page)
//       .then(({ data: { results } }) =>
//         this.setState(prevState => ({
//           movies: [...prevState.movies, ...results],
//         }))
//       )
//       .catch(error => this.setState({ error: error.message }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { movies, currentPoster, isListShown, isLoading } = this.state;
//     return (
//       <>
//         <Button
//           text={isListShown ? 'Hide movies list' : 'Show movies list'}
//           clickHandler={this.toggleList}
//         />

//         {isLoading && <Loader />}

//         {isListShown && (
//           <>
//             <MoviesGallery
//               movies={movies}
//               onDelete={this.handleDelete}
//               openModal={this.openModal}
//             />
//             <Button text="Load more" clickHandler={this.loadMore} />
//           </>
//         )}

//         {currentPoster && (
//           <Modal poster={currentPoster} closeModal={this.closeModal} />
//         )}
//       </>
//     );
//   }
// }

import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { Modal } from './Modal/Modal';
import { fetchMovies } from 'services/moviesAPI';
import { Button } from 'components/button/Button';
import { Loader } from './Loader/Loader';
import { useEffect, useState } from 'react';
import { AuthNav } from './AuthNav/AuthNav';
import React, { useContext } from 'react';
import { AuthContext } from 'Context/Context';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPoster, setCurrentPoster] = useState(null);
  const [isListShown, setIsListShown] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (isListShown) {
      setIsLoading(true);
      fetchMovies(page)
        .then(({ data: { results } }) =>
          setMovies(prevState => [...prevState, ...results])
        )
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
    if (!isListShown) {
      setMovies([]);
      setPage(1);
    }
  }, [page, isListShown]);

  //

  const handleDelete = id => {
    setMovies(prevState => prevState.filter(movie => movie.id !== id));
  };

  const openModal = data => {
    setCurrentPoster(data);
  };

  const closeModal = () => {
    setCurrentPoster(null);
  };

  const toggleList = () => {
    setIsListShown(prevState => !prevState);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <AuthNav />
      {isAuth ? (
        <>
          <Button
            text={isListShown ? 'Hide movies list' : 'Show movies list'}
            clickHandler={toggleList}
          />

          {isLoading && <Loader />}

          {isListShown && (
            <>
              <MoviesGallery
                movies={movies}
                onDelete={handleDelete}
                openModal={openModal}
              />
              <Button text="Load more" clickHandler={loadMore} />
            </>
          )}

          {currentPoster && (
            <Modal poster={currentPoster} closeModal={closeModal} />
          )}
        </>
      ) : (
        <p>"Login please"</p>
      )}
    </>
  );
};
