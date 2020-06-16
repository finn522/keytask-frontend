import { useAuth } from "helpers/auth-context";

function HookWrapper({ render }) {
    const hookValue = useAuth();
    const user = hookValue[0].user
    return render(user);
  }

  export default HookWrapper;