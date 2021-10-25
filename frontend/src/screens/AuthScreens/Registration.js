import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/actions/userActions";
import "./Auth.css";
import Loader from "../../UI/Loader/Loader";

const Registration = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/discover";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
   {loading ? <Loader/> : <main>
      {error | message && (
        <div class="user-message user-message__error">{error | message}</div>
      )}

      <form className="login-form" onSubmit={submitHandler}>
        <h1>Sign up</h1>

        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="login__actions">
          <div className="new__user">
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="new__user__link"
            >
              Have an Account?
            </Link>
          </div>
          <button className="btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </main>}
    </>
  );
};

export default Registration;
