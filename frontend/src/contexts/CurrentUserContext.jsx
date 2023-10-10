import PropTypes from "prop-types";
import { createContext, useContext, useState, useMemo } from "react";

const CurrentUserContext = createContext();

export const useCurrentUserContext = () => useContext(CurrentUserContext);

function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const fields = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <CurrentUserContext.Provider value={fields}>
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.node,
};

CurrentUserContextProvider.defaultProps = {
  children: undefined,
};

export default CurrentUserContextProvider;
