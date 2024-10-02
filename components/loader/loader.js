import classes from "./loader.module.css";

export default function Loader() {
  return (
    <div className={classes.loaderMain}>
      <div className={classes.dotSpinner}>
        <div className={classes.dotSpinner__dot}></div>
        <div className={classes.dotSpinner__dot}></div>
        <div className={classes.dotSpinner__dot}></div>
        <div className={classes.dotSpinner__dot}></div>
        <div className={classes.dotSpinner__dot}></div>
        <div className={classes.dotSpinner__dot}></div>
        <div className={classes.dotSpinner__dot}></div>
        <div className={classes.dotSpinner__dot}></div>
      </div>
    </div>
  );
}
