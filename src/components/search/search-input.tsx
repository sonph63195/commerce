"use client";

import * as React from "react";
import { Input } from "../ui/input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  inputId?: string;
};

export function SearchInput({
  value,
  onChange,
  onSubmit,
  onFocus,
  placeholder = "Tìm sản phẩm, danh mục...",
  inputId = "searchInput",
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onSubmit(q);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={inputId}>
        Search
      </label>
      <Input
        id={inputId}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
      />
    </form>
  );
}
