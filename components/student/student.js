import Image from "next/image";
import classes from "./student.module.css";
import Link from "next/link";
import { useRef, useState } from "react";
import Loader from "../loader/loader";
import GlitchLoader from "../loader/glitch_loader";
import { usePathname } from "next/navigation";
import ThreeDot from "../loader/three_body";
import styles from "./download.module.css";
import { generateCertificate } from "@/lib/download";

export default function Student() {
  const [searchOn, setSearchOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});
  const [click, setClick] = useState(false);
  const searchMainRef = useRef(null);
  const searchRef = useRef(null);
  const pathname = usePathname();

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    setResult({});
    setSearchOn(true);
    const search = searchRef.current.value;
    try {
      const res = await fetch(`/api/results/${search}`);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }
      console.log(data);
      setResult({
        id: data.certificate_id,
        name: data.name,
        internship_domain: data.internship_domain,
        start: data.start,
        end: data.end,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleDownload = () => {
    console.log(click);
    if (click) {
      setClick(false);
      return;
    }
    setClick(true);
    const name = result.name;
    const internshipDomain = result.internship_domain;
    const startDate = result.start;
    const endDate = result.end;

    generateCertificate(name, internshipDomain, startDate, endDate);
  };
  return (
    <div className={classes.centerDiv}>
      <header className={classes.header}>
        <div className={classes.img}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={150}
              priority={true}
            />
          </Link>
        </div>
        <div className={classes.Services}>
          <Link href="/" className={classes.smallScreenOptions}>
            <h3 className={pathname === "/" ? classes.selectedNav : ""}>
              Home
            </h3>
          </Link>
          <span className={classes.smallScreenOptions}></span>
          <Link href="/admin">
            <h3 className={pathname === "/admin" ? classes.selectedNav : ""}>
              Admin
            </h3>
          </Link>
          <span></span>
          <Link href="/coders">
            <h3 className={pathname === "/coders" ? classes.selectedNav : ""}>
              Coders
            </h3>
          </Link>
          <span className={classes.smallScreenOptions}></span>
          <Link href="/" className={classes.smallScreenOptions}>
            <h3>FAQs</h3>
          </Link>
        </div>
        <div className={classes.FAQs}>
          <Link href="/">
            <h3>FAQs</h3>
          </Link>
        </div>
      </header>
      <div className={classes.heading}>
        <h1>Generate Your Certificate Instantly</h1>
        <p>View or Download your certificate instantly.</p>
        <form
          className={`${classes.searchbar} ${searchOn ? classes.searchOn : ""}`}
          onSubmit={submitHandler}
          ref={searchMainRef}
        >
          <input
            type="text"
            placeholder="Enter Certificate ID"
            ref={searchRef}
            required
          />
          <button
            type="submit"
            style={
              loading
                ? {
                    color: "black",
                    backgroundColor: "black",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }
                : {}
            }
          >
            {loading && (
              <div className={classes.loadingHolder}>
                <Loader />
              </div>
            )}
            Get Certificate
          </button>
        </form>
        <div
          className={`${searchOn ? classes.backdrop : ""}`}
          style={searchOn ? {} : { opacity: 0, pointerEvents: "none" }}
        ></div>
        <div
          className={`${classes.viewResult} ${
            searchOn ? classes.viewResultOn : ""
          }`}
          style={loading ? { overflow: "hidden" } : {}}
        >
          <h3>
            Certificate for{" "}
            <strong>{result.id ? result.id : searchRef?.current?.value}</strong>
          </h3>
          <div className={classes.gridResultView}>
            <div className={classes.gridResultViewSingle}>
              <div className={classes.gridResultViewTopic}>Name:</div>
              <div className={classes.gridResultViewMain}>
                {loading ? (
                  <GlitchLoader />
                ) : result.name ? (
                  result.name
                ) : (
                  "N.A."
                )}
              </div>
            </div>
            <div className={classes.gridResultViewSingle}>
              <div className={classes.gridResultViewTopic}>
                Internship Domain:
              </div>
              <div className={classes.gridResultViewMain}>
                {loading ? (
                  <GlitchLoader />
                ) : result.internship_domain ? (
                  result.internship_domain
                ) : (
                  "N.A."
                )}
              </div>
            </div>
            <div className={classes.gridResultViewSingle}>
              <div className={classes.gridResultViewTopic}>Start Date:</div>
              <div className={classes.gridResultViewMain}>
                {loading ? (
                  <GlitchLoader />
                ) : result.start ? (
                  result.start
                ) : (
                  "N.A."
                )}
              </div>
            </div>
            <div className={classes.gridResultViewSingle}>
              <div className={classes.gridResultViewTopic}>End Date:</div>
              <div className={classes.gridResultViewMain}>
                {loading ? <GlitchLoader /> : result.end ? result.end : "N.A."}
              </div>
            </div>
          </div>
          <div className={classes.gridResultViewTotal}>
            <div
              className={`${classes.gridResultViewTopicLast} ${classes.gridResultViewTopic}`}
            >
              Download Certificate
            </div>
            <div className={classes.gridResultViewMain}>
              {loading ? (
                <ThreeDot />
              ) : result ? (
                <div className={styles.container} onClick={handleDownload}>
                  <label className={styles.label}>
                    <input type="checkbox" className={styles.input} />
                    <span className={styles.circle}>
                      <svg
                        className={styles.icon}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 19V5m0 14-4-4m4 4 4-4"
                        ></path>
                      </svg>
                      <div className={styles.square}></div>
                    </span>
                    <p className={styles.title}>Download</p>
                    <p className={styles.title}>Open</p>
                  </label>
                </div>
              ) : (
                "N.A."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
