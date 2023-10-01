import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

export const setUpUser = (comp, props) => {
  return {
    user: userEvent.setup(),
    ...render(comp, props),
  };
};
