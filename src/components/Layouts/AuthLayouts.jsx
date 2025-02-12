import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { children, title, type } = props;

  return (
    <div className="flex justify-center bg-white min-h-screen items-center">
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
        <p className="font-medium text-slate-800 mb-8">
          Welcome, Create account here
        </p>
        {children}
        <p className="text-sm mt-5 text-center">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}

          {/* TODO: Oprasi && cocok digunakan saat kondisinya lebih dari 2  */}
          {type === "login" && (
            <Link to="/register" className="text-blue-600 font-bold">
              Sign Up
            </Link>
          )}

          {type === "register" && (
            <Link to="/login" className="text-blue-600 font-bold">
              Sign In
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
