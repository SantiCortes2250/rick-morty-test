import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Filters from "../components/Filters";

const setFiltersMock = vi.fn();
const onCloseMock = vi.fn();

vi.mock("../store/useCharacterStore", () => {
  return {
    useCharacterStore: () => ({
      filters: {
        search: "",
        favorites: "all",
        species: "all",
        status: "all",
        gender: "all",
        sort: "asc",
      },
      setFilters: setFiltersMock,
    }),
  };
});

describe("Filters Component", () => {
  beforeEach(() => {
    setFiltersMock.mockClear();
    onCloseMock.mockClear();
  });

  it("renderiza todas las secciones de filtros", () => {
    render(<Filters onClose={onCloseMock} />);
    expect(screen.getByText("Character")).toBeInTheDocument();
    expect(screen.getByText("Specie")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Sort")).toBeInTheDocument();
  });

  it("actualiza localFilters al seleccionar un Character filter", () => {
    render(<Filters onClose={onCloseMock} />);
    const starredBtn = screen.getByText("Starred");

    fireEvent.click(starredBtn);

    // aún no se aplica, solo se actualiza localFilters
    expect(setFiltersMock).not.toHaveBeenCalled();
  });

  it("aplica filtros y llama a setFilters y onClose", () => {
    render(<Filters onClose={onCloseMock} />);
    const alienBtn = screen.getByText("Alien");
    fireEvent.click(alienBtn);

    const applyBtn = screen.getByText("Filter");
    fireEvent.click(applyBtn);

    expect(setFiltersMock).toHaveBeenCalledWith(
      expect.objectContaining({ species: "Alien" })
    );
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("cierra el modal al presionar el botón de back en mobile", () => {
    render(<Filters onClose={onCloseMock} />);
    const backButton = screen.getByRole("button", { name: "" }); // el botón con el icono
    fireEvent.click(backButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
