import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-libary/react";
import App from "../App"

describe('Test component App', () => { 
    if("Happly Flow - should render texts when user gets into the page", () => {
        render(<App />)
        expect(screen.getByText("San deal hot")).not.toBeIntheDocument()
    }) 
})