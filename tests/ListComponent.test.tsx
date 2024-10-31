import { render, screen, fireEvent } from '@testing-library/react';
import ListComponent from "../src/components/ListComponent";
import ListStore from "../src/stores/ListStore";
import { act } from 'react';
import ListItem from '../src/components/ListItem';

describe("ListComponent", () => {
  beforeEach(() => {
    // Мокаем fetchItems, чтобы он возвращал два элемента по умолчанию
    ListStore.fetchItems = jest.fn().mockResolvedValue([
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ]);
  });

  it("подгружает новые элементы при скролле до конца", async () => {
    render(<ListComponent />);
    const container = screen.getByRole("list");

    await act(async () => {
      fireEvent.scroll(container, {
        target: { scrollTop: container.scrollHeight - container.clientHeight / 4 },
      });
    });

    // Проверяем, что метод fetchItems был вызван, как ожидается
    expect(ListStore.fetchItems).toHaveBeenCalled();
  });

  it("отображает сообщение об отсутствии данных, если список пуст", async () => {
    ListStore.fetchItems = jest.fn().mockResolvedValue([]);
    render(<ListComponent />);
    
    // Ожидаем, что текст о пустом списке отображается
    const noDataText = await screen.findByText(/No data/i);
    expect(noDataText).toBeInTheDocument();
  });
});

describe("ListItem", () => {
  it("вызывает обработчик при нажатии на кнопку Delete", () => {
    const onDelete = jest.fn();
    render(<ListItem item={{ id: 1, name: "Test Item" }} onDelete={onDelete} onEdit={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(onDelete).toHaveBeenCalled();
  });
  

  it("переключает режим редактирования при нажатии на Edit и сохраняет изменения", () => {
    const onEdit = jest.fn();
    render(<ListItem item={{ id: 1, name: "Test Item" }} onDelete={jest.fn()} onEdit={onEdit} />);
    
    // Нажимаем "Edit" и проверяем, что появился текстбокс для ввода
    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    // Изменяем значение в текстбоксе и убираем фокус
    fireEvent.change(input, { target: { value: "Updated Item" } });
    fireEvent.blur(input);

    // Проверяем, что onEdit был вызван с новым именем
    expect(onEdit).toHaveBeenCalledWith("Updated Item");

    // Убеждаемся, что компонент отображает обновленное значение
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByText("Updated Item")).toBeInTheDocument();
  });
});
