import React, { useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Button, TextField, Stack, CssBaseline
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
  import {
  getAprendices,
  getAprendizPorId,
  crearAprendiz as crearAprendizService,
  actualizarAprendiz as actualizarAprendizService,
  eliminarAprendiz as eliminarAprendizService,
} from "../services/AprendicesServices"
import TablaAprendices from "../components/TablaAprendiz";
import FormularioAprendiz from "../components/FormularioAprendiz";
import BarraAcciones from "../components/BarraAcciones";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#22d3ee" },       // cian
    secondary: { main: "#a78bfa" },     // violeta
    error: { main: "#ef4444" },
    background: { default: "#0b1220", paper: "#111827" }, // dark limpio
    text: { primary: "#e5e7eb", secondary: "#94a3b8" }
  }
});

const inputSX = {
  bgcolor: "#f3f4f6",       // fondo claro para inputs
  borderRadius: 1,
  input: { color: "#111827" },
  "& .MuiInputLabel-root": { color: "#374151" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#94a3b8" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#22d3ee" }
};

const ListaAprendices = () => {
  const API_BASE = "http://localhost:8080/api/v1/aprendices";
  //const API_BASE = "https://backadso-production.up.railway.app/api/v1/aprendiz"

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", telefono: "", direccion: "",programa:"",ficha:"",sede:"",jornada:"",genero:"" });
  const [idFiltro, setIdFiltro] = useState("");



const fetchTodos = async () => {
  try {
    setLoading(true);
    const data = await getAprendices();
    setData(data);
  } catch (e) {
    console.error("Error cargando aprendices:", e);
    setData([]);
  } finally { setLoading(false); }
};

const fetchPorId = async () => {
  if (!idFiltro) return;
  try {
    setLoading(true);
    const data = await getAprendizPorId(idFiltro);
    setData(data ? [data] : []);
    if (data) setForm(data);
  } catch { setData([]); } finally { setLoading(false); }
};

const crearAprendiz = async () => {
  try {
    setLoading(true);
    await crearAprendizService(form);
    setForm({ nombre: "", apellido: "", email: "", telefono: "", direccion: "", programa: "", ficha: "", sede: "", jornada: "", genero: "" });
    await fetchTodos();
  } catch (e) { console.error("Error creando aprendiz:", e); }
  finally { setLoading(false); }
};

const actualizarAprendiz = async () => {
  if (!idFiltro) return;
  try {
    setLoading(true);
    await actualizarAprendizService(idFiltro, form);
    setForm({ nombre: "", apellido: "", email: "", telefono: "", direccion: "", programa: "", ficha: "", sede: "", jornada: "", genero: "" });
    await fetchTodos();
  } catch (e) { console.error("Error actualizando aprendiz:", e); }
  finally { setLoading(false); }
};

const eliminarPorId = async () => {
  if (!idFiltro) return;
  try { setLoading(true); await eliminarAprendizService(idFiltro); await fetchTodos(); }
  catch (e) { console.error("Error eliminando aprendiz:", e); }
  finally { setLoading(false); }
};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
        {/* Barra de acciones */}
       <BarraAcciones
        idFiltro={idFiltro}
        setIdFiltro={setIdFiltro}
        loading={loading}
        onVerTodos={fetchTodos}
        onBuscarPorId={fetchPorId}
        onEliminarPorId={eliminarPorId}
        onActualizar={actualizarAprendiz}
        />

        <FormularioAprendiz form={form} setForm={setForm} onCrear={crearAprendiz} loading={loading} />
        <TablaAprendices data={data} />

  
        
      </Box>
    </ThemeProvider>
  );
};

export default ListaAprendices;
