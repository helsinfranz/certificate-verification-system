import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import classes from "@/styles/auth.module.css";
import Link from "next/link";
import Loader from "@/components/loader/loader";

export default function Auth() {
  const router = useRouter();
  const authKey = router.query.key;
  const userName = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (authKey && !["login", "signup"].includes(authKey)) {
      router.push("/auth/login");
    }
  }, [authKey]);

  async function handleSignup(e) {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const name = userName.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Something went wrong");
      } else {
        alert("Signup successful");
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const email = loginEmail.current.value;
    const password = loginPassword.current.value;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (res.error) {
        alert(res.error);
      } else {
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  if (status === "authenticated") {
    router.push("/admin");
  } else if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>
            {authKey === "login"
              ? "Login - Certificate Verification System"
              : "Register - Certificate Verification System"}
          </title>
          <meta
            name="description"
            content="Admin Page for certificate verification system"
          />
        </Head>
        {/* <div className={classes.logoMain}>
          <Image src={"/logo.png"} alt="logo" width={200} height={200} />
        </div> */}
        <div className={classes.container}>
          {authKey === "signup" ? (
            <div className={classes.loginBox}>
              <p>Signup</p>
              <form onSubmit={handleSignup}>
                <div className={classes.userBox}>
                  <input
                    required
                    type="name"
                    name="name"
                    minLength={3}
                    maxLength={20}
                    ref={userName}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className={classes.userBox}>
                  <input type="name" required ref={emailRef} name="email" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className={classes.userBox}>
                  <input
                    type="password"
                    required
                    minLength={4}
                    maxLength={20}
                    ref={passwordRef}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button type="submit">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {loading ? <Loader /> : "Submit"}
                </button>
              </form>
              <p>
                Already have an account?{" "}
                <Link href="/auth/login" className={classes.a2}>
                  Log In!
                </Link>
              </p>
            </div>
          ) : (
            <div className={classes.loginBox}>
              <p>Login</p>
              <form onSubmit={handleLogin}>
                <div className={classes.userBox}>
                  <input type="name" required ref={loginEmail} name="email" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className={classes.userBox}>
                  <input
                    type="password"
                    required
                    minLength={4}
                    maxLength={20}
                    ref={loginPassword}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button type="submit">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {loading ? <Loader /> : "Submit"}
                </button>
              </form>
              <p>
                Don't have an account?{" "}
                <Link href="/auth/signup" className={classes.a2}>
                  Sign up!
                </Link>
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
  return <div></div>;
}
