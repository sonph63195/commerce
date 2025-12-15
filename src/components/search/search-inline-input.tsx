"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchInput } from "./search-input";

type SearchInlineInputProps = {
  initialQuery?: string;
};

const DEBOUNCE_MS = 300;

export function SearchInlineInput({ initialQuery = "" }: SearchInlineInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const hasMountedRef = useRef(false);

  const handleSubmit = (value: string) => {
    const q = value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const timeoutId = setTimeout(() => {
      const trimmed = query.trim();
      if (!trimmed) return;
      router.replace(`/search?q=${encodeURIComponent(trimmed)}`);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [query, router]);

  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      onSubmit={handleSubmit}
    />
  );
}
