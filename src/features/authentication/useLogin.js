import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  // cache this
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // creates the cache to make loging in faster
      queryClient.setQueryData(["user"], user.user);
      console.log(user);
      // Replace stop the user from using the backbutton
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log(`ERROR`, err);
      toast.error("Username or password is incorrect");
    },
  });
  return { login, isLoading, isError };
}

export default useLogin;
