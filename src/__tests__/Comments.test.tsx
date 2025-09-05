import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Comments from "../components/Comments";

const addCommentMock = vi.fn();
const removeCommentMock = vi.fn();

vi.mock("../store/useCharacterStore", () => {
  return {
    useCharacterStore: () => ({
      comments: {
        1: ["Primer comentario", "Otro comentario"],
      },
      addComment: addCommentMock,
      removeComment: removeCommentMock,
    }),
  };
});

describe("Comments Component", () => {
  beforeEach(() => {
    addCommentMock.mockClear();
    removeCommentMock.mockClear();
  });

  it("renderiza comentarios existentes", () => {
    render(<Comments id="1" />);
    expect(screen.getByText("Primer comentario")).toBeInTheDocument();
    expect(screen.getByText("Otro comentario")).toBeInTheDocument();
  });

  it("agrega un comentario con el botón", () => {
    render(<Comments id="1" />);
    const input = screen.getByPlaceholderText("Write a comment...");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Nuevo comentario" } });
    fireEvent.click(button);

    expect(addCommentMock).toHaveBeenCalledWith(1, "Nuevo comentario");
  });

  it("agrega un comentario presionando Enter", () => {
    render(<Comments id="1" />);
    const input = screen.getByPlaceholderText("Write a comment...");

    fireEvent.change(input, { target: { value: "Enter comment" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addCommentMock).toHaveBeenCalledWith(1, "Enter comment");
  });

  it("elimina un comentario al presionar el botón 🗑", () => {
    render(<Comments id="1" />);
    const deleteButtons = screen.getAllByRole("button", { name: "🗑" });

    fireEvent.click(deleteButtons[0]);

    expect(removeCommentMock).toHaveBeenCalledWith(1, 0);
  });
});
