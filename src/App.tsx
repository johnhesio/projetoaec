import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Entrar from "@/pages/Entrar"
import PatientArea from "@/pages/paciente/PatientArea"
import PatientLogin from "@/pages/paciente/PatientLogin"
import PatientSignup from "@/pages/paciente/PatientSignup"
import PatientDashboard from "@/pages/paciente/PatientDashboard"
import ProfessionalArea from "@/pages/profissional/ProfessionalArea"
import ProfessionalLogin from "@/pages/profissional/ProfessionalLogin"
import ProfessionalSignup from "@/pages/profissional/ProfessionalSignup"
import ProfessionalDashboard from "@/pages/profissional/ProfessionalDashboard"
import NotFound from "@/pages/NotFound"
import ProtectedRoute from "@/components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/entrar" element={<Entrar />} />
      <Route path="/paciente" element={<PatientArea />} />
      <Route path="/paciente/entrar" element={<PatientLogin />} />
      <Route path="/paciente/cadastro" element={<PatientSignup />} />
      <Route
        path="/paciente/painel"
        element={
          <ProtectedRoute redirectTo="/paciente/entrar">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/profissional" element={<ProfessionalArea />} />
      <Route path="/profissional/entrar" element={<ProfessionalLogin />} />
      <Route path="/profissional/cadastro" element={<ProfessionalSignup />} />
      <Route
        path="/profissional/painel"
        element={
          <ProtectedRoute redirectTo="/profissional/entrar">
            <ProfessionalDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
