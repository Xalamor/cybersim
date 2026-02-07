import { Card, CardContent, Typography, Stack, Divider } from "@mui/material";

export default function About() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={800}>
            О проекте
          </Typography>

          <Typography color="text.secondary">
            Проект моделирует типичные ситуации цифровой безопасности (фишинг, пароли, публичный Wi-Fi, соцсети).
            Пользователь выбирает действие, получает обратную связь и итоговый уровень безопасности.
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography fontWeight={700}>Цель</Typography>
          <Typography color="text.secondary">
            Повысить цифровую грамотность подростков через интерактивное моделирование последствий решений.
          </Typography>

          <Typography fontWeight={700}>Технологии</Typography>
          <Typography color="text.secondary">
            React + Vite, Material UI, React Router. Данные сохраняются локально (localStorage), сервер не используется.
          </Typography>

          <Typography fontWeight={700}>Расширяемость</Typography>
          <Typography color="text.secondary">
            Новые ситуации добавляются в файл <b>src/data/situations.js</b> без изменения логики приложения.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
