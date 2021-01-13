export const Header = () => <div><h1>Loft Taxi</h1></div>;

export const LoginForm = () => <div><form><input type="text"/></form></div>;

export const LoginPanel = () => (
  <div><LoginForm /></div>
);

export const LoginPage = () => (
  <><Header /><LoginPanel /></> 
);