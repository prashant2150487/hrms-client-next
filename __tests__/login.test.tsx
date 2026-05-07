import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/(auth)/login/page";
import { login } from "@/api/auth/auth";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the API call
jest.mock("@/api/auth/auth", () => ({
  login: jest.fn(),
}));

describe("Login Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders login form correctly", () => {
    render(<LoginPage />);

    // Check if the headings and placeholders are present
    expect(screen.getByText("Welcome 👋")).toBeInTheDocument();
    expect(screen.getByText("Please login here")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    (login as jest.Mock).mockResolvedValue({
      data: { success: true, message: "Login successfull" },
    });

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "admin111@lapscore.com");

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "test11@123");

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("handles login failure", async () => {
    (login as jest.Mock).mockRejectedValue(new Error("Generic Error"));

    render(<LoginPage />);

    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText("An error occurred during login.")
      ).toBeInTheDocument();
    });
  });
});
