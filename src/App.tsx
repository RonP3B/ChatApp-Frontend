import { Navigate, Route, Routes } from "react-router-dom";
import {
  SignIn,
  SignUp,
  PasswordRecovery,
  Chat,
  UserActivation,
} from "./pages";
import {
  PersistSession,
  RequiresAuth,
  RequiresUnauth,
} from "./shared/components/persistence";

const App = () => {
  return (
    <Routes>
      <Route element={<PersistSession />}>
        <Route element={<RequiresUnauth />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
        </Route>
        <Route element={<RequiresAuth />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route path="/user-activation/:username" element={<UserActivation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
