import { useEffect, useRef } from "react";

function useOutsideHooks(closeHandler, listenDuringCapturing = true) {
  // UseRef will be used to create a reference to the styled modal DOM element
  // see <StyledModal ref={ref}
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // e.stopPropagation();
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("click outside the modal, on bg");
          closeHandler();
        }
      }
      document.addEventListener("click", handleClick, listenDuringCapturing);

      // Remove listener when component unmounts return ()
      return () =>
        document.removeEventListener(
          "click",
          handleClick,
          listenDuringCapturing
        );
    },

    [closeHandler, listenDuringCapturing]
  );
  return ref;
}

export default useOutsideHooks;
