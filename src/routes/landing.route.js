import { landing } from "../config/webURL";
import Landing from "../components/Landing";

const FormListRoute = [
  {
    path: landing,
    exact: true,
    isProtected: false,
    component: Landing,
  },
];

export default FormListRoute;
