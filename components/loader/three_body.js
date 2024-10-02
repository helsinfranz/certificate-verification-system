import classes from "./three_body.module.css";

export default function ThreeDot() {
  return (
    <div className={classes.threebody}>
      <div className={classes.threebody__dot}></div>
      <div className={classes.threebody__dot}></div>
      <div className={classes.threebody__dot}></div>
    </div>
  );
}
