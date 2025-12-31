"use client";

import * as React from "react";
import { Input } from "../ui/input";

type SearchInputProps = {
  value: string;
  onChangeAction: (value: string) => void;
  onSubmitAction: (value: string) => void;
  onFocusAction?: () => void;
  placeholder?: string;
  inputId?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export function SearchInput({
  value,
  onChangeAction,
  onSubmitAction,
  onFocusAction,
  placeholder = "Tìm sản phẩm, danh mục...",
  inputId = "searchInput",
  inputProps,
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onSubmitAction(q);
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
        onChange={(e) => onChangeAction(e.target.value)}
        onFocus={onFocusAction}
        {...inputProps}
      />
    </form>
  );
}
