import { useEffect } from 'react';

export const Modal = ({ closeModal, poster }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [closeModal]);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeydown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeydown);
  // }

  const { src, alt } = poster;
  return (
    <div>
      <div>
        <button onClick={closeModal}>Close</button>
        <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
      </div>
    </div>
  );
};
