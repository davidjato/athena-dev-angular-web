#!/usr/bin/env bash
set -e

ROOT=${1:-.}

# --- carpetas base ---
mkdir -p "$ROOT/src/app"
mkdir -p "$ROOT/src/assets"
mkdir -p "$ROOT/src/environments"

################################
# CORE
################################
mkdir -p "$ROOT/src/app/core/guards"
mkdir -p "$ROOT/src/app/core/interceptors"
mkdir -p "$ROOT/src/app/core/services"
mkdir -p "$ROOT/src/app/core/layout"
mkdir -p "$ROOT/src/app/core/config"
mkdir -p "$ROOT/src/app/core/utils"

# READMEs
echo "# Core" > "$ROOT/src/app/core/README.md"
echo "# Guards" > "$ROOT/src/app/core/guards/README.md"
echo "# Interceptors" > "$ROOT/src/app/core/interceptors/README.md"
echo "# Services" > "$ROOT/src/app/core/services/README.md"
echo "# Layout (core)" > "$ROOT/src/app/core/layout/README.md"
echo "# Config" > "$ROOT/src/app/core/config/README.md"
echo "# Utils" > "$ROOT/src/app/core/utils/README.md"

# index.ts para reexportar
echo "// reexports for core" > "$ROOT/src/app/core/index.ts"
echo "export * from './guards';" >> "$ROOT/src/app/core/index.ts"
echo "export * from './interceptors';" >> "$ROOT/src/app/core/index.ts"
echo "export * from './services';" >> "$ROOT/src/app/core/index.ts"

# sub-index
echo "// core guards exports" > "$ROOT/src/app/core/guards/index.ts"
echo "// core interceptors exports" > "$ROOT/src/app/core/interceptors/index.ts"
echo "// core services exports" > "$ROOT/src/app/core/services/index.ts"

################################
# SHARED
################################
mkdir -p "$ROOT/src/app/shared/components"
mkdir -p "$ROOT/src/app/shared/directives"
mkdir -p "$ROOT/src/app/shared/pipes"
mkdir -p "$ROOT/src/app/shared/models"
mkdir -p "$ROOT/src/app/shared/validators"

echo "# Shared" > "$ROOT/src/app/shared/README.md"
echo "// shared barrel" > "$ROOT/src/app/shared/index.ts"
echo "export * from './components';" >> "$ROOT/src/app/shared/index.ts"
echo "export * from './directives';" >> "$ROOT/src/app/shared/index.ts"
echo "export * from './pipes';" >> "$ROOT/src/app/shared/index.ts"
echo "export * from './models';" >> "$ROOT/src/app/shared/index.ts"
echo "export * from './validators';" >> "$ROOT/src/app/shared/index.ts"

echo "// shared components" > "$ROOT/src/app/shared/components/index.ts"
echo "// shared directives" > "$ROOT/src/app/shared/directives/index.ts"
echo "// shared pipes" > "$ROOT/src/app/shared/pipes/index.ts"
echo "// shared models" > "$ROOT/src/app/shared/models/index.ts"
echo "// shared validators" > "$ROOT/src/app/shared/validators/index.ts"

################################
# FEATURES (ejemplo)
################################
mkdir -p "$ROOT/src/app/features/_example/components"
mkdir -p "$ROOT/src/app/features/_example/pages"
mkdir -p "$ROOT/src/app/features/_example/services"

echo "# Features" > "$ROOT/src/app/features/README.md"

# feature example files
cat > "$ROOT/src/app/features/_example/_example.feature.md" <<'EOF'
# Feature de ejemplo

- Coloca aquí la descripción de la feature.
- Define componentes en `components/`
- Define páginas/rutas en `pages/`
- Define servicios de dominio en `services/`
EOF

cat > "$ROOT/src/app/features/_example/index.ts" <<'EOF'
// reexports for _example feature
export * from './components';
export * from './pages';
export * from './services';
EOF

echo "// example components" > "$ROOT/src/app/features/_example/components/index.ts"
echo "// example pages" > "$ROOT/src/app/features/_example/pages/index.ts"
echo "// example services" > "$ROOT/src/app/features/_example/services/index.ts"

################################
# LAYOUT
################################
mkdir -p "$ROOT/src/app/layout/shells"
mkdir -p "$ROOT/src/app/layout/components"

echo "# Layout" > "$ROOT/src/app/layout/README.md"
echo "// layout barrel" > "$ROOT/src/app/layout/index.ts"

################################
# ROUTES
################################
mkdir -p "$ROOT/src/app/routes"
cat > "$ROOT/src/app/routes/app.routes.ts" <<'EOF'
// aquí puedes centralizar las rutas si no las dejas en main.ts
// export const APP_ROUTES: Routes = [ ... ];
EOF

################################
# STORE / STATE
################################
mkdir -p "$ROOT/src/app/store"
echo "# Store / Signals" > "$ROOT/src/app/store/README.md"
echo "// store barrel" > "$ROOT/src/app/store/index.ts"

################################
# ASSETS
################################
mkdir -p "$ROOT/src/assets/icons"
mkdir -p "$ROOT/src/assets/images"
mkdir -p "$ROOT/src/assets/i18n"

echo "# Assets" > "$ROOT/src/assets/README.md"

echo "✅ Estructura de carpetas y archivos creada en $ROOT"
