// в зависимости от ширины подгружается количество карточек
export const getLoadCount = (width) => {
    if (width >= 1280) {
        return 3;
    }

    if (width >= 768) {
        return 2;
    }

    return 2;
}

// отображание количества карточек изначально
export const getInitialCount = (width) => {
    if (width >= 1280) {
        return 12;
    }

    if (width >= 768) {
        return 8;
    }

    return 5;
}

/*   const width = useCurrentWidth();
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));

  //загрузка карточек
  const handleLoadMore = () => {
      setVisibleMoviesCount((previousCount) => previousCount + getLoadCount(width))
  }*/