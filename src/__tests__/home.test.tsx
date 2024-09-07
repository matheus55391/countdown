import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    }),
    useSearchParams: () => ({
      get: () => {}
    })
  }
})

it("renders h1 title", () => {
  render(<Home />);
  const title = screen.getByText("Countdown Timer");
  expect(title).toBeInTheDocument();
  
});
