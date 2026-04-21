import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { theme } from "../theme";
import { type useForcastProps } from "../types";

// [1] The Entry Point

export function SearchBar({ onSearch, loading }: useForcastProps) {
  // manages it's own local state (value) for the input value
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    // a callback function (onSearch) is made when form is (handleSubmit) 
    if (trimmed) onSearch(trimmed);
  }

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInputWrapper>
       
        <SearchInput
          type="text"
          placeholder="Enter a city or town…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <SearchButton type="submit" disabled={loading || !value.trim()}>

           {/* Displays a Spinner and disables button to prevent duplicate searches */}

          {loading ? <Spinner /> : "Explore"}
        </SearchButton>
      </SearchInputWrapper>
    </SearchForm>
  );
}

const SearchForm = styled.form`
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 4px;
  justify-content: space-between;
  background: ${theme.colors.surface};
  border: 1.5px solid ${theme.colors.borderStrong};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.md};
  transition: border-color ${theme.transition}, box-shadow ${theme.transition};

  &:focus-within {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(200, 75, 47, 0.12), ${theme.shadow.md};
  }
`;

const SearchInput = styled.input`
  
  border: none;
  outline: none;
  font-family: ${theme.font.body};
  font-size: 1rem;
  font-weight: 400;
  color: ${theme.colors.ink};
  background: transparent;
  padding-left: 10px;

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
  padding: 10px 20px;
  font-family: ${theme.font.body};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transform: translateX(-5px);
  transition: background ${theme.transition}, transform ${theme.transition};
  display: inline-flex;
  align-items: center;

  &:hover:not(:disabled) {
    background: ${theme.colors.accentHover};
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