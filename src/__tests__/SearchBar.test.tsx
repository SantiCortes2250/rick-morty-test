import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "../components/SearchBar";

// Creamos una variable global para el mock
const setFiltersMock = vi.fn();

vi.mock("../store/useCharacterStore", () => {
  return {
    useCharacterStore: () => ({
      filters: { search: "" },
      setFilters: setFiltersMock,
    }),
  };
});

vi.mock("../components/Filters", () => {
  return {
    default: ({ onClose }: { onClose: () => void }) => (
      <div data-testid="filters">
        Filters Component
        <button onClick={onClose}>Close</button>
      </div>
    ),
  };
});

describe("SearchBar Component", () => {
  beforeEach(() => {
    setFiltersMock.mockClear(); // limpia llamadas antes de cada test
  });

  it("renderiza el input con placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search or filter results")
    ).toBeInTheDocument();
  });

  it("llama a setFilters al escribir en el input", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search or filter results");

    fireEvent.change(input, { target: { value: "Rick" } });

    expect(setFiltersMock).toHaveBeenCalledWith({
      search: "Rick",
    });
  });

  it("muestra y oculta el componente Filters al hacer click en el botón", () => {
    render(<SearchBar />);
    const button = screen.getByRole("button");

    // Abre los filtros
    fireEvent.click(button);
    expect(screen.getByTestId("filters")).toBeInTheDocument();

    // Cierra los filtros
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("filters")).not.toBeInTheDocument();
  });
});
