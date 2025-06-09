import classes from "./loading.module.css";
export default function MealsLoadingPage() {
  return (
    <p className={classes.loading}>
      Please wait while we fetch the latest meals for you.
    </p>
  );
}
