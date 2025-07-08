import { useMutation } from "@tanstack/react-query";

export default function useRandomJoke() {
  const { mutate, data, isPending } = useMutation({
    mutationFn: async () => {
      const headers = new Headers();
      headers.append("Accept", "application/json");

      const res = await fetch("https://icanhazdadjoke.com/", { headers });

      return (await res.json()) as { id: string; joke: string; status: number };
    },
  });

  return { refetch: mutate, loading: isPending, joke: data?.joke } as const;
}
