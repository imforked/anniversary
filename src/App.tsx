import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { DiscoverPage } from "./pages/DiscoverPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
