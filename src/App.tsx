import { Navigate, Route, Routes } from "react-router";
import {
  SignInPage,
  SignUpPage,
  PasswordRecoveryPage,
  ChatPage,
  UserActivationPage,
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
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
        </Route>
        <Route element={<RequiresAuth />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
        <Route
          path="/user-activation/:username"
          element={<UserActivationPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
