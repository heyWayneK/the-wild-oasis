import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import { Toaster } from "react-hot-toast";

import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import { DarkModeProvider } from "./context/DarkModeContext";
// import ErrorFallback from "./ui/ErrorFallback";
// import { ErrorBoundary } from "react-error-boundary";

const StyledApp = styled.div`
  background-color: var(--color-brand-200);
  padding: 20px;
`;

function App() {
  // <StyledApp></StyledApp>

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        // staleTime: 60 * 1000,
      },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 3000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
            backgroundColor: "var(--color--grey-0)",
            color: "var (--color-grey-700)",
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                // <ErrorBoundary
                //   FallbackComponent={ErrorFallback}
                //   onReset={() => window.location.replace("/")}
                // >
                <AppLayout />
                // </ErrorBoundary>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
