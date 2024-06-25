import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AllQuizzes from "./pages/AllQuizzes";
import NewQuiz from "./pages/NewQuiz";
import EditQuiz from "./pages/EditQuiz";
import ResolveQuiz from "./pages/ResolveQuiz";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-quizzes" element={<AllQuizzes />} />
          <Route path="/new-quiz" element={<NewQuiz />} />
          <Route path="/edit/:id" element={<EditQuiz />} />
          <Route path="/:id" element={<ResolveQuiz />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
