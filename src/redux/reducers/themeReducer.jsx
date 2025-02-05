
const initialState = {
    darkMode: localStorage.getItem("theme") === "dark", 
  };
  
  export const TOGGLE_THEME = "TOGGLE_THEME";
  
  export const toggleTheme = () => ({
    type: TOGGLE_THEME,
  });
  
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_THEME:
        const newTheme = !state.darkMode;
        localStorage.setItem("theme", newTheme ? "dark" : "light"); 
        return { ...state, darkMode: newTheme };
  
      default:
        return state;
    }
  };
  
  export default themeReducer;
  