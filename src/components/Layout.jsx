import { useMemo, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  Stack,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SecurityIcon from "@mui/icons-material/Security";

const NAV = [
  { label: "Главная", to: "/" },
  { label: "Симуляция", to: "/play" },
  { label: "О проекте", to: "/about" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const active = useMemo(() => location.pathname, [location.pathname]);

  const [open, setOpen] = useState(false);

  const title = "CyberSim";

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ gap: 1 }}>
          {/* ✅ Моб. бургер */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
            aria-label="Открыть меню"
          >
            <MenuIcon />
          </IconButton>

          {/* ✅ Лого + название (не ломается) */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1, minWidth: 0 }}
          >
            <SecurityIcon />

            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{ fontWeight: 800, minWidth: 0 }}
            >
              {title}
            </Typography>

            {/* ✅ Chip показываем только на sm+ */}
            <Chip
              size="small"
              label="Симулятор цифровой безопасности"
              sx={{
                ml: 1,
                display: { xs: "none", md: "inline-flex" },
              }}
            />
          </Stack>

          {/* ✅ Десктоп-меню (скрыто на xs) */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {NAV.map((item) => (
              <Button
                key={item.to}
                color="inherit"
                component={RouterLink}
                to={item.to}
                variant={active === item.to ? "outlined" : "text"}
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* ✅ Мобильный Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SecurityIcon />
            <Typography fontWeight={900}>{title}</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Навигация
          </Typography>
        </Box>

        <Divider />

        <List>
          {NAV.map((item) => (
            <ListItemButton
              key={item.to}
              component={RouterLink}
              to={item.to}
              selected={active === item.to}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Данные не отправляются на сервер. Всё работает локально.
          </Typography>
        </Box>
      </Drawer>

      {/* ✅ Контент */}
      <Box component="main" sx={{ flex: 1, py: { xs: 2, sm: 4 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 1.5, sm: 2 } }}>
          {children}
        </Container>
      </Box>

      {/* ✅ Футер */}
      <Box component="footer" sx={{ py: 3, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <Container maxWidth="md" sx={{ px: { xs: 1.5, sm: 2 } }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {title} — учебный проект.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
