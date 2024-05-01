import { redirect } from "react-router-dom";
import { COUNTRIES_PAGE } from "./routes/route-paths.ts";

function App() {
  return redirect(COUNTRIES_PAGE);
}

export default App;
