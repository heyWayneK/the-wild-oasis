import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const {
    mutate: signup,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: signupApi,
    // mutationKey: ["auth"],
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        `Account succesfullys created. Please verify your email address, see the email sent to ${user.email}`
      );
    },
  });
  //   console.log(signup);
  return { signup, isLoading, isError };
}

export default useSignup;
