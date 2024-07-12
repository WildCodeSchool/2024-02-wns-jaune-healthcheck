import { useState, useEffect } from "react";

type Dimensions = {
    width: number,
    height: number
};

const useScreenDimensions = (): Dimensions => {
    const getCurrentDimension = (): Dimensions => {
        return {
            width: innerWidth,
            height: innerHeight
        }
    }
  const [screenSize, setScreenSize] = useState<Dimensions>(getCurrentDimension());
  
  useEffect(() => {
      const updateDimension = (): void => {
          setScreenSize(getCurrentDimension());
      }
      window.addEventListener('resize', updateDimension);

      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
  }, [])

  return screenSize;
}

export default useScreenDimensions;