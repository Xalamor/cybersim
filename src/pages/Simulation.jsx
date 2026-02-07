import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  LinearProgress,
  Alert,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SITUATIONS, CATEGORIES } from "../data/situations.js";
import {
  clamp,
  emptyCategoryScore,
  safetyPctFromTotal,
  safetyLabel,
} from "../utils/scoring.js";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(mode) {
  const base = [...SITUATIONS];
  if (mode === "quick") return base.slice(0, Math.min(8, base.length));
  return base;
}

function byIdMap(list) {
  const m = new Map();
  for (const x of list) m.set(x.id, x);
  return m;
}

export default function Simulation() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") === "quick" ? "quick" : "full";
  const random = params.get("random") === "1";

  const pool = useMemo(() => buildPool(mode), [mode]);
  const map = useMemo(() => byIdMap(pool), [pool]);

  const order = useMemo(() => {
    const ids = pool.map((s) => s.id);
    return random ? shuffle(ids) : ids;
  }, [pool, random]);

  const [orderIndex, setOrderIndex] = useState(0);
  const currentId = order[orderIndex] ?? null;
  const current = currentId ? map.get(currentId) : null;

  const [totalScore, setTotalScore] = useState(0);
  const [catScore, setCatScore] = useState(() => emptyCategoryScore());
  const [answered, setAnswered] = useState(false);
  const [pickedId, setPickedId] = useState(null);
  const [mistakes, setMistakes] = useState([]);

  // перемешанные ответы
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (current) setShuffledOptions(shuffle(current.options));
    else setShuffledOptions([]);
  }, [currentId]);

  const safetyPct = safetyPctFromTotal(totalScore);
  const level = safetyLabel(safetyPct);

  const progressPct = Math.round((orderIndex / Math.max(order.length, 1)) * 100);

  function reset() {
    setOrderIndex(0);
    setTotalScore(0);
    setCatScore(emptyCategoryScore());
    setAnswered(false);
    setPickedId(null);
    setMistakes([]);
  }

  function choose(optionId) {
    if (!current || answered) return;
    const opt = current.options.find((o) => o.id === optionId);
    if (!opt) return;

    setPickedId(optionId);
    setAnswered(true);

    setTotalScore((prev) => clamp(prev + (opt.impact?.total ?? 0), -999, 999));

    setCatScore((prev) => {
      const next = { ...prev };
      const deltas = opt.impact?.categories ?? {};
      for (const c of CATEGORIES) {
        if (typeof deltas[c] === "number") {
          next[c] = clamp(next[c] + deltas[c], -999, 999);
        }
      }
      return next;
    });

    if (optionId !== current.bestOptionId) {
      setMistakes((prev) => [
        ...prev,
        {
          id: current.id,
          title: current.title,
          category: current.category,
          pickedText: opt.text,
          tip: current.tip,
        },
      ]);
    }
  }

  function finish() {
    navigate("/result", {
      state: {
        mode,
        visitedCount: order.length,
        poolSize: pool.length,
        totalScore,
        safetyPct: safetyPctFromTotal(totalScore),
        catScore,
        mistakes,
      },
    });
  }

  function next() {
    if (!current) return;

    if (mode === "full") {
      const last = orderIndex >= order.length - 1;
      if (last) {
        finish();
        return;
      }
      setOrderIndex((i) => i + 1);
      setAnswered(false);
      setPickedId(null);
      return;
    }

    const picked = pickedId ? current.options.find((o) => o.id === pickedId) : null;
    const nextId = picked?.nextId ?? null;

    if (nextId && map.has(nextId)) {
      const nextIndex = order.indexOf(nextId);
      if (nextIndex !== -1) setOrderIndex(nextIndex);
      else setOrderIndex((i) => Math.min(i + 1, order.length - 1));
    } else {
      const last = orderIndex >= order.length - 1;
      if (last) {
        finish();
        return;
      }
      setOrderIndex((i) => i + 1);
    }

    setAnswered(false);
    setPickedId(null);
  }

  if (!current) {
    return (
      <Alert severity="error">
        Нет доступных ситуаций. Проверь <b>src/data/situations.js</b>.
      </Alert>
    );
  }

  return (
    <Stack spacing={{ xs: 1.5, sm: 2 }}>
      <Card>
        <LinearProgress variant="determinate" value={progressPct} />
        <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
          <Stack spacing={{ xs: 1, sm: 1.25 }}>
            {/* ✅ Чипы: корректный перенос на мобилке */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              useFlexGap
              sx={{ rowGap: 1 }}
            >
              <Chip label={`Режим: ${mode === "full" ? "полный" : "быстрый"}`} />
              <Chip
                label={`Вопрос: ${orderIndex + 1}/${order.length}`}
                variant="outlined"
              />
              <Chip label={current.category} variant="outlined" />
              <Chip
                label={`Безопасность: ${safetyPct}% (${level.label})`}
                color={level.severity}
              />
            </Stack>

            <Typography
              fontWeight={800}
              sx={{ pt: 0.5, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
            >
              {current.title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ fontSize: { xs: "1rem", sm: "1rem" }, lineHeight: 1.5 }}
            >
              {current.scenario}
            </Typography>

            <Divider sx={{ my: 0.5 }} />

            {/* ✅ Ответы: кнопки на всю ширину + перенос текста */}
            <Stack spacing={1}>
              {shuffledOptions.map((o) => {
                const selected = pickedId === o.id;
                const best = current.bestOptionId === o.id;

                let variant = "outlined";
                let color = "primary";

                if (answered) {
                  if (selected && best) {
                    variant = "contained";
                    color = "success";
                  } else if (selected && !best) {
                    variant = "contained";
                    color = "error";
                  } else if (!selected && best) {
                    variant = "outlined";
                    color = "success";
                  }
                }

                return (
                  <Button
                    key={o.id}
                    variant={variant}
                    color={color}
                    onClick={() => choose(o.id)}
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      textAlign: "left",
                      py: 1.2,
                      px: 1.25,
                      whiteSpace: "normal",   // ✅ перенос строк
                      alignItems: "flex-start",
                      lineHeight: 1.35,
                    }}
                  >
                    {o.text}
                  </Button>
                );
              })}
            </Stack>

            {answered && (
              <Alert
                severity={pickedId === current.bestOptionId ? "success" : "warning"}
                sx={{ mt: 1.5 }}
              >
                {(current.options.find((o) => o.id === pickedId)?.feedback) ?? "—"}
              </Alert>
            )}

            {/* ✅ Нижние кнопки: на мобилке столбиком и fullWidth */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ mt: 1.5 }}
            >
              <Button
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={reset}
                fullWidth
                sx={{ py: 1.1 }}
              >
                Начать заново
              </Button>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={next}
                disabled={!answered}
                fullWidth
                sx={{ py: 1.1 }}
              >
                {orderIndex >= order.length - 1 ? "Завершить" : "Далее"}
              </Button>
            </Stack>

            {/* небольшой отступ снизу на мобилке, чтобы не прилипало */}
            <Box sx={{ display: { xs: "block", sm: "none" }, height: 4 }} />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
          <Typography fontWeight={800} gutterBottom sx={{ fontSize: { xs: "1.05rem", sm: "1.1rem" } }}>
            Профиль по категориям
          </Typography>
          <Stack spacing={1}>
            {CATEGORIES.map((c) => (
              <Stack
                key={c}
                direction="row"
                justifyContent="space-between"
                sx={{
                  px: 0.25,
                }}
              >
                <Typography color="text.secondary" sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                  {c}
                </Typography>
                <Typography fontWeight={800} sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                  {catScore[c]}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
