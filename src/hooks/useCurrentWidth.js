import { useEffect, useState } from 'react';

const useCurrentWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;

        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
        }
        // set resize listener
        window.addEventListener('resize', resizeListener);

        //clean up function after add
        return () => {
            //remove resize listener
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    return width;
}

export default useCurrentWidth;