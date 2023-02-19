import { useRef, useEffect, MutableRefObject } from 'react';

const useIsMountedRef = (): MutableRefObject<boolean> => {
    const isMountedRef = useRef<boolean>(true);
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);
    return isMountedRef;
};

export default useIsMountedRef;