function useLogOut() {
  function logOut() {
    localStorage.removeItem("saved-state");
  }

  return logOut;
}

export { useLogOut };
