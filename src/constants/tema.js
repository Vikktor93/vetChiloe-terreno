/**
 * VetChiloé · Variables de estilo (React Native, JavaScript)
 * Fuente: Figma "App Vet · Screens" (variables crema, lima, verde, petroleo, carmesi, blanco).
 *
 * REGLAS
 * 1. Acciones principales en la mitad inferior de la pantalla.
 * 2. Todo lo tocable mide >= 48 dp (minHeight/minWidth o hitSlop).
 * 3. Ningún texto < 14; el cuerpo es 16.
 * 4. Contraste de texto >= 4,5:1 (valores calculados con la fórmula WCAG de WebAIM).
 */
import { Dimensions, Platform, StyleSheet } from 'react-native';

/* ───────────── COLORES ───────────── */
export const colors = {
  // Paleta del proyecto
  crema: '#F3FFC6', // fondo de pantallas
  lima: '#C3EB78', // acento suave, tab activo, badge "Pendiente"
  verde: '#306B34', // acción primaria, "En curso"
  petroleo: '#1C5253', // texto principal, bordes, "Realizada"
  carmesi: '#B6174B', // alerta, "Cancelada", pin activo
  blanco: '#FFFFFF', // tarjetas, barra inferior

  // Semánticos (alias, no valores nuevos)
  background: '#F3FFC6',
  surface: '#FFFFFF',
  border: '#1C5253',
  text: '#1C5253',
  textMuted: '#1C5253', // sin opacidad: bajar opacidad rompe el contraste
  textOnPrimary: '#FFFFFF',
  primary: '#306B34',
  accent: '#C3EB78',
  danger: '#B6174B',
};

/**
 * Pares texto/fondo permitidos y su contraste (WebAIM). Todos >= 4,5:1.
 * Usa SOLO estos pares para texto.
 */
export const textPairs = {
  petroleoSobreCrema: { fg: colors.petroleo, bg: colors.crema, ratio: 8.37 },
  petroleoSobreBlanco: { fg: colors.petroleo, bg: colors.blanco, ratio: 8.82 },
  petroleoSobreLima: { fg: colors.petroleo, bg: colors.lima, ratio: 6.5 },
  verdeSobreBlanco: { fg: colors.verde, bg: colors.blanco, ratio: 6.41 },
  verdeSobreCrema: { fg: colors.verde, bg: colors.crema, ratio: 6.08 },
  verdeSobreLima: { fg: colors.verde, bg: colors.lima, ratio: 4.72 },
  blancoSobreVerde: { fg: colors.blanco, bg: colors.verde, ratio: 6.41 },
  blancoSobrePetroleo: { fg: colors.blanco, bg: colors.petroleo, ratio: 8.82 },
  blancoSobreCarmesi: { fg: colors.blanco, bg: colors.carmesi, ratio: 6.54 },
  carmesiSobreBlanco: { fg: colors.carmesi, bg: colors.blanco, ratio: 6.54 },
  carmesiSobreCrema: { fg: colors.carmesi, bg: colors.crema, ratio: 6.2 },
  carmesiSobreLima: { fg: colors.carmesi, bg: colors.lima, ratio: 4.82 },
};

export const statusColors = {
  pendiente: { bg: colors.lima, fg: colors.petroleo }, // 6,50
  enCurso: { bg: colors.verde, fg: colors.blanco }, // 6,41
  realizada: { bg: colors.petroleo, fg: colors.blanco }, // 8,82
  cancelada: { bg: colors.carmesi, fg: colors.blanco }, // 6,54
};

export const fontFamily = {
  regular: 'Nunito-Regular',
  semibold: 'Nunito-SemiBold',
  bold: 'Nunito-Bold',
  extrabold: 'Nunito-ExtraBold',
};

export const fontSize = {
  caption: 14, // mínimo absoluto (antes 12/13 en Figma)
  body: 16, // texto de cuerpo
  button: 16,
  titleM: 18, // antes 17
  titleL: 22,
  titleXL: 28,
};

export const MIN_FONT_SIZE = 14;
export const BODY_FONT_SIZE = 16;

export const typography = {
  caption: { fontFamily: fontFamily.regular, fontSize: fontSize.caption, lineHeight: 20 },
  captionSemi: { fontFamily: fontFamily.semibold, fontSize: fontSize.caption, lineHeight: 20 },
  label: { fontFamily: fontFamily.bold, fontSize: fontSize.caption, lineHeight: 20 }, // etiquetas, badges, tabs
  body: { fontFamily: fontFamily.regular, fontSize: fontSize.body, lineHeight: 24 },
  bodySemi: { fontFamily: fontFamily.semibold, fontSize: fontSize.body, lineHeight: 24 },
  button: { fontFamily: fontFamily.bold, fontSize: fontSize.button, lineHeight: 22 },
  titleM: { fontFamily: fontFamily.bold, fontSize: fontSize.titleM, lineHeight: 24 },
  titleL: { fontFamily: fontFamily.bold, fontSize: fontSize.titleL, lineHeight: 28 },
  titleXL: { fontFamily: fontFamily.extrabold, fontSize: fontSize.titleXL, lineHeight: 36 },
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 };
export const radius = { sm: 12, md: 16, lg: 24, pill: 999 };

export const skeleton = {
  boneColor: "#D8E9C0",
  highlightColor: colors.crema,
  layouts: {
    pacientesSubtitulo: [{ width: 128, height: 14 }],
    pacientes: Array.from({ length: 3 }, () => ({
      width: "100%",
      height: 96,
      marginBottom: spacing.md,
      padding: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      backgroundColor: colors.blanco,
      borderColor: colors.petroleo,
      borderWidth: 1,
      borderRadius: radius.md,
      children: [
        { width: 60, height: 60, borderRadius: 30 },
        {
          flex: 1,
          gap: spacing.xs,
          children: [
            { width: 112, height: 16 },
            { width: 88, height: 14 },
            { width: 104, height: 14 },
          ],
        },
        { width: 18, height: 48 },
      ],
    })),
    ficha: [
      {
        width: "100%",
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        children: [
          { width: 48, height: 48, borderRadius: 24 },
          { width: 180, height: 24 },
        ],
      },
      {
        width: "100%",
        marginTop: spacing.sm,
        borderRadius: radius.md,
        overflow: "hidden",
        backgroundColor: colors.blanco,
        children: [
          {
            width: "100%",
            height: 190,
            backgroundColor: colors.petroleo,
            children: [
              {
                width: 88,
                height: 88,
                borderRadius: 44,
                alignSelf: "center",
                marginTop: spacing.lg,
              },
              {
                width: 160,
                height: 20,
                alignSelf: "center",
                marginTop: 16,
              },
              {
                width: 112,
                height: 16,
                alignSelf: "center",
                marginTop: spacing.xs,
              },
            ],
          },
          {
            width: "100%",
            height: 52,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            children: [
              { width: 64, height: 16 },
              { width: 64, height: 16 },
              { width: 64, height: 16 },
            ],
          },
          {
            width: "100%",
            padding: spacing.md,
            gap: spacing.sm,
            children: [
              ...Array.from({ length: 3 }, () => ({
                width: "100%",
                height: 48,
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.sm,
                borderRadius: radius.pill,
                paddingHorizontal: spacing.sm,
                children: [
                  { width: 32, height: 32, borderRadius: 16 },
                  {
                    flex: 1,
                    gap: spacing.xs,
                    children: [
                      { width: 76, height: 12 },
                      { width: 116, height: 14 },
                    ],
                  },
                ],
              })),
              {
                width: "100%",
                height: 48,
                marginTop: spacing.sm,
                flexDirection: "row",
                gap: spacing.sm,
                children: [
                  { width: 112, height: 48, borderRadius: radius.pill },
                  { width: 112, height: 48, borderRadius: radius.pill },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  styles: StyleSheet.create({
    pacientesSubtitulo: {
      width: 128,
      height: 20,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    pacientesLista: {
      width: "100%",
      alignItems: "stretch",
    },
    ficha: {
      flex: 1,
      width: "100%",
      alignItems: "stretch",
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.sm,
    },
  }),
};

export const shadow = Platform.select({
  ios: {
    shadowColor: colors.petroleo,
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  default: { elevation: 6 },
});

export const MIN_TOUCH = 48;

/** Estilo para todo elemento tocable: nunca menor a 48 dp. */
export const touchTarget = {
  minHeight: MIN_TOUCH,
  minWidth: MIN_TOUCH,
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Para elementos visualmente pequeños (ícono de 20, checkbox de 22, switch, chevron):
 * calcula el hitSlop que falta hasta 48 dp sin cambiar el dibujo.
 * Ej: <Pressable hitSlop={hitSlopFor(22, 22)}> ... </Pressable>
 */
export function hitSlopFor(width, height) {
  const h = Math.max(0, Math.ceil((MIN_TOUCH - width) / 2));
  const v = Math.max(0, Math.ceil((MIN_TOUCH - height) / 2));
  return { top: v, bottom: v, left: h, right: h };
}

/* ───────────── REGLA 1: ACCIONES PRINCIPALES EN LA MITAD INFERIOR ───────────── */
export const layout = {
  bottomBarHeight: 88, // barra de navegación inferior
  /** Altura donde empieza la mitad inferior. Úsala para validar posición de CTAs. */
  get bottomHalfTop() {
    return Dimensions.get('window').height / 2;
  },
  /** Barra fija para el CTA principal de cada pantalla (pegada abajo). */
  ctaBar: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  /** Botón flotante (reemplaza el "+" arriba a la derecha de Pacientes). */
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: 10 + spacing.xs, // margen pequeño sobre la barra inferior
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.verde,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

/* ───────────── COMPONENTES BASE ───────────── */
export const baseStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md + 2,
  },
  buttonPrimary: {
    ...touchTarget,
    minHeight: 52,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
  },
  buttonPrimaryText: { ...typography.button, color: colors.textOnPrimary },
  buttonSecondary: {
    ...touchTarget,
    minHeight: 52,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.petroleo,
    backgroundColor: colors.blanco,
  },
  buttonSecondaryText: { ...typography.button, color: colors.petroleo },
  chip: {
    ...touchTarget, // 48 dp de alto (antes 34-36)
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.petroleo,
    backgroundColor: colors.blanco,
  },
  chipActive: { backgroundColor: colors.verde, borderColor: colors.verde },
  chipText: { ...typography.captionSemi, color: colors.petroleo },
  chipTextActive: { color: colors.blanco },
  input: {
    minHeight: MIN_TOUCH,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.petroleo,
    backgroundColor: colors.blanco,
    ...typography.body,
    color: colors.text,
  },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm },
  badgeText: { ...typography.label },
  tab: { flex: 1, minHeight: 64, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { ...typography.label, color: colors.petroleo },
  tabLabelActive: { color: colors.verde },
  listRow: { minHeight: 56, flexDirection: 'row', alignItems: 'center' },
});

export const theme = {
  colors,
  statusColors,
  textPairs,
  fontFamily,
  fontSize,
  typography,
  spacing,
  radius,
  skeleton,
  shadow,
  layout,
  MIN_TOUCH,
  MIN_FONT_SIZE,
  BODY_FONT_SIZE,
};