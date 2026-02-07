import { useEffect, useMemo } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Alert,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import HomeIcon from "@mui/icons-material/Home";
import { safetyLabel, readBest, writeBest } from "../utils/scoring.js";
import { CATEGORIES } from "../data/situations.js";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  const safetyPct = state?.safetyPct ?? 0;
  const level = useMemo(() => safetyLabel(safetyPct), [safetyPct]);

  const catScore = state?.catScore ?? {};
  const mistakes = state?.mistakes ?? [];
  const visitedCount = state?.visitedCount ?? 0;
  const poolSize = state?.poolSize ?? 0;

  const weakCats = useMemo(() => {
    // Чем меньше (или более отрицательно) — тем слабее
    const arr = CATEGORIES.map((c) => ({ c, v: Number(catScore[c] ?? 0) }));
    arr.sort((a, b) => a.v - b.v);
    return arr.slice(0, 2);
  }, [catScore]);

  useEffect(() => {
    if (!state) return;
    const best = readBest();
    const current = {
      pct: safetyPct,
      dateIso: new Date().toISOString(),
    };
    if (!best || (typeof best.pct === "number" && current.pct > best.pct)) {
      writeBest(current);
    }
  }, [state, safetyPct]);

  const best = readBest();

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={800}>
              Итог симуляции
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
              <Chip label={`Уровень: ${level.label}`} color={level.severity} />
              <Chip label={`Безопасность: ${safetyPct}%`} variant="outlined" />
              <Chip label={`Пройдено: ${visitedCount} шаг(ов)`} variant="outlined" />
              <Chip label={`Пул: ${poolSize}`} variant="outlined" />
            </Stack>

            {best?.pct != null && (
              <Alert severity="info" sx={{ mt: 1 }}>
                Лучший результат на этом устройстве: <b>{best.pct}%</b>
              </Alert>
            )}

            <Divider sx={{ my: 1 }} />

            <Alert severity="info">
              Слабые зоны: <b>{weakCats[0]?.c}</b> и <b>{weakCats[1]?.c}</b>.
              Это то, что стоит прокачать в первую очередь.
            </Alert>

            <Typography fontWeight={800} sx={{ mt: 1 }}>
              Профиль категорий
            </Typography>
            <Stack spacing={0.5}>
              {CATEGORIES.map((c) => (
                <Stack key={c} direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">{c}</Typography>
                  <Typography fontWeight={700}>{Number(catScore[c] ?? 0)}</Typography>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ my: 1 }} />

            {mistakes.length === 0 ? (
              <Alert severity="success">Почти идеально: критических ошибок не было.</Alert>
            ) : (
              <>
                <Alert severity="warning">
                  Ошибки: <b>{mistakes.length}</b>. Вот что было рискованно:
                </Alert>
                <List>
                  {mistakes.map((m) => (
                    <ListItem key={m.id} alignItems="flex-start">
                      <ListItemText
                        primary={`${m.title} — ${m.category}`}
                        secondary={
                          <>
                            <div>Твой выбор: {m.pickedText}</div>
                            <div>Совет: {m.tip}</div>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 1 }}>
              <Button component={RouterLink} to="/play?mode=quick" variant="contained" startIcon={<ReplayIcon />}>
                Быстрый режим
              </Button>
              <Button component={RouterLink} to="/play?mode=full" variant="outlined" startIcon={<ReplayIcon />}>
                Полный режим
              </Button>
              <Button component={RouterLink} to="/" variant="text" startIcon={<HomeIcon />}>
                На главную
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
