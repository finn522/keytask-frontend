import React from "react";

const FilterContext = React.createContext();

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useFilter() {
  const context = React.useContext(FilterContext);
  if (!context) throw new Error("useFilter must be used in FilterProvider");

  return context;
}

function FilterProvider(props) {
  const [state, setState] = React.useReducer(reducer, {
      myTask: true,
      claimedTask: true,
      openTask: true,
  });

  const value = React.useMemo(() => [state, setState], [state]);

  return <FilterContext.Provider value={value} {...props} />;

}

function changeInput(target, setState, value) {
  setState({
    [target]: value
  });
}


export { FilterProvider, useFilter, changeInput };