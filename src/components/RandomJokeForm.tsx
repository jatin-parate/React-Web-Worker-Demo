import Form from "react-bootstrap/Form";
import Shell from "./Shell";
import { useCallback, type FormEventHandler } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import useRandomJoke from "../hooks/useRandomJoke";

export default function RandomJokeForm() {
  const { refetch, loading, joke } = useRandomJoke();
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      refetch();
    },
    [refetch]
  );

  return (
    <Shell>
      {joke && <p>{joke}</p>}
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          {loading ? <Spinner /> : "Get Random Joke"}
        </Button>
      </Form>
    </Shell>
  );
}
