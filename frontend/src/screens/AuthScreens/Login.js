import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/userActions";
import "./Auth.css";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : '/discover';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <main>
      {error &&
        <div class="user-message user-message__error">{error}</div>}
        
      <form className="login-form" onSubmit={submitHandler}>
        <h1>Sign In</h1>
        
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login__actions">
        <div className="new__user">
          <Link to="/register" className="new__user__link">
            New User?
          </Link>
        </div>
          <button className="btn" type="submit">
            Login
          </button>
        </div>
        
      </form>
    </main>
  );
};

export default Login;
