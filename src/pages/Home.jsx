import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, Stack, Alert } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import BoltIcon from "@mui/icons-material/Bolt";
import LockIcon from "@mui/icons-material/Lock";

export default function Home() {
  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              Интерактивный симулятор цифровой безопасности
            </Typography>
            <Typography color="text.secondary">
              Пройди реальные ситуации (фишинг, пароли, Wi-Fi, соцсети) и посмотри последствия своих решений.
            </Typography>

            <Alert severity="info">
              Никакие данные не отправляются на сервер — всё работает локально в браузере.
            </Alert>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ pt: 1 }}>
  <Button
    component={RouterLink}
    to="/play?mode=quick"
    variant="contained"
    size="large"
    fullWidth
    sx={{ py: 1.2 }}
  >
    Быстрый режим (8)
  </Button>

  <Button
    component={RouterLink}
    to="/play?mode=full"
    variant="outlined"
    size="large"
    fullWidth
    sx={{ py: 1.2 }}
  >
    Полный режим (все)
  </Button>
</Stack>

          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Stack spacing={1}>
              <ShieldIcon />
              <Typography fontWeight={700}>Сценарии из жизни</Typography>
              <Typography variant="body2" color="text.secondary">
                Короткие ситуации, где нужно выбрать действие.
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Stack spacing={1}>
              <LockIcon />
              <Typography fontWeight={700}>Объяснение ошибок</Typography>
              <Typography variant="body2" color="text.secondary">
                После каждого выбора — понятное пояснение.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Box />
    </Stack>
  );
}
