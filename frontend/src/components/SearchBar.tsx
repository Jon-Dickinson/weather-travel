import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { theme } from "../theme";

const SearchForm = styled.form`
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.surface};
  border: 1.5px solid ${theme.colors.borderStrong};
  border-radius: ${theme.radius.lg};
  padding: 6px 6px 6px 18px;
  gap: 8px;
  box-shadow: ${theme.shadow.md};
  transition: border-color ${theme.transition}, box-shadow ${theme.transition};

  &:focus-within {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(200, 75, 47, 0.12), ${theme.shadow.md};
  }
`;

const SearchIcon = styled.span`
  font-size: 1.1rem;
  color: ${theme.colors.inkFaint};
  flex-shrink: 0;
  line-height: 1;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: ${theme.font.body};
  font-size: 1rem;
  font-weight: 400;
  color: ${theme.colors.ink};
  background: transparent;
  padding: 10px 0;

  &::placeholder {
    color: ${theme.colors.inkFaint};
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const SearchButton = styled.button`
  background: ${theme.colors.accent};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 11px 22px;
  font-family: ${theme.font.body};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
  transition: background ${theme.transition}, transform ${theme.transition};
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover:not(:disabled) {
    background: ${theme.colors.accentHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface Props {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInputWrapper>
        <SearchIcon>⌖</SearchIcon>
        <SearchInput
          type="text"
          placeholder="Enter a city or town…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <SearchButton type="submit" disabled={loading || !value.trim()}>
          {loading ? <Spinner /> : "Explore"}
        </SearchButton>
      </SearchInputWrapper>
    </SearchForm>
  );
}
