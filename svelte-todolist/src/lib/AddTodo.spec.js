import { setUpUser } from "../testUtils/setUpUser";

import AddTodo from "./AddTodo.svelte";

describe("AddTodo", () => {
  test("says 'hello world!'", () => {
    const { user, getByRole } = setUpUser(AddTodo);
    const addButton = getByRole("button");
    expect(addButton).toBeInTheDocument();
  });
});
