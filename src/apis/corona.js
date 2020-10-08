import { CoronaClient } from "@aero/corona";

export default new CoronaClient({
  lifetime: 60 * 60 * 1000,
  url: "https://disease.sh/v2/",
});
