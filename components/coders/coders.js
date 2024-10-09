import styles from "./coders.module.css";
import classes from "../student/student.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const contributors = [
  {
    fullname: "Himanshu Rawat",
    img: "/self.jpg",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/in/himanshu-rawat-212813179/",
    github: "https://github.com/helsinfranz",
  },
  {
    fullname: "Kartik",
    img: "/kartik.jpeg",
    role: "Front End Developer",
    linkedin: "https://www.linkedin.com/in/kartik-dhaka-945902265",
    github: "https://github.com/KARTIK0048",
  },
  {
    fullname: "Meduri Aiswarya",
    img: "/meduri.jpeg",
    role: "Front End Developer",
    linkedin:
      "https://www.linkedin.com/in/meduri-sri-sai-venkata-laxmi-aishwarya-4bb22524b",
    github: "https://github.com/aisu72880",
  },
  {
    fullname: "SSK Karthikeya",
    img: "/ssk.jpeg",
    role: "Front End Developer",
    linkedin: "https://www.linkedin.com/in/karthikeya-ssk-803186285/",
    github: "https://github.com/sskkarthikeya",
  },
  {
    fullname: "Arjit Pandey",
    img: "/arjit.jpeg",
    role: "Front End Developer",
    linkedin: "https://www.linkedin.com/in/arjit-pandey-2b546a247/",
    github: "https://github.com/Arjit-p08",
  },
  {
    fullname: "Rajveer Singh",
    img: "/rajveer.jpeg",
    role: "Front End Developer",
    github: "https://github.com/Rajveer2245",
  },
  {
    fullname: "Palchhin Jain",
    img: "/avatar.png",
    role: "Front End Developer",
  },
];

export default function CodersComp() {
  const pathname = usePathname();
  return (
    <div className={`${styles.centerDiv} ${classes.centerDiv}`}>
      <header className={classes.header}>
        <div className={classes.img}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={150}
              priority={true}
              style={{
                mixBlendMode: "lighten",
              }}
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
      <div className={styles.main}>
        {contributors.map((contributor) => (
          <div className={styles.mainBox}>
            <div className={styles.mainImage}>
              <Image
                src={contributor.img}
                alt={contributor.fullname}
                width={150}
                height={150}
                priority={true}
              />
            </div>
            <div className={styles.mainText}>
              <div className={styles.mainFullName}>{contributor.fullname}</div>
              <div className={styles.mainRole}>{contributor.role}</div>
              <div className={styles.mainSocials}>
                {contributor.linkedin && (
                  <Link
                    className={styles.mainLinkedIn}
                    href={contributor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                    LinkedIn
                  </Link>
                )}
                {contributor.github && (
                  <Link
                    className={styles.mainGithub}
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                    Github
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
