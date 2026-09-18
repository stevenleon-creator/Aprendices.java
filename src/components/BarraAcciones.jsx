import React from "react";
import { Stack, Typography, Button, TextField } from "@mui/material";

const inputSX = {
  bgcolor: "#f3f4f6",
  borderRadius: 1,
  input: { color: "#111827" },
  "& .MuiInputLabel-root": { color: "#374151" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#94a3b8" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#22d3ee" }
};

const BarraAcciones = ({ idFiltro, setIdFiltro, loading, onVerTodos, onBuscarPorId, onEliminarPorId, onActualizar }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ flex: 1, fontWeight: 700, color: "text.primary" }}>
        Aprendices
      </Typography>
      <Button variant="contained" color="primary" onClick={onVerTodos} disabled={loading}>
        {loading ? "Cargando..." : "VER TODOS"}
      </Button>
      <TextField
        size="small" label="ID" value={idFiltro} onChange={(e) => setIdFiltro(e.target.value)}
        sx={{ ...inputSX, width: 140 }}
      />
      <Button variant="contained" color="secondary" onClick={onBuscarPorId} disabled={loading || !idFiltro}>
        BUSCAR POR ID
      </Button>
      <Button variant="contained" color="error" onClick={onEliminarPorId} disabled={loading || !idFiltro}>
        ELIMINAR POR ID
      </Button>
      <Button variant="contained" color="primary" onClick={onActualizar} disabled={loading || !idFiltro}>
        ACTUALIZAR
      </Button>
    </Stack>
  );
};

export default BarraAcciones;