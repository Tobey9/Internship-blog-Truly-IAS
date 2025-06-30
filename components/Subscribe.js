import style from "./Subscribe.module.css";

export default function Subscribe() {
  return (
    <div className={style.right}>
      <h2>Get my latest blog sent straight to your email</h2>
      <p>
        Enter your email address to follow this blog and receive notifications
        of new posts by email.
      </p>
      <input type="text" placeholder="Email" />
      <button className={style.notifButton}>submit</button>
    </div>
  );
}
