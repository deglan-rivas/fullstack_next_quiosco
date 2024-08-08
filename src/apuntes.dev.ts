// s58
// features de nextjs -> preconfigurado ; optimizaciones image link caching ; en ts ; routing ; data fetching ; rendering in server and client ez
// crear el proyecto -> pnpm dlx create-next-app@latest ; cd x ; pnpm dev ; borrar tailwind.config.ts ; global.css ; y contenido de .tsx
// naming y files reservados -> page ; layout ; segments o folders para routing ; route not-found error loading etc
// rendering -> use server por default, use client -> orden render unidireccional, use client heredado -> cuándo? server components para  orm, auth, token, files -> client components para api navegador LS o GeoLocation, react hooks useState, eventos onClick onChange, libs de terceros como zustand que usan useRef por debajo
// contenedores principales -> order(s) y products

// recordar siempre estilar contenedores antes de contenido
// usar responsive viewer plugin chrome web store para tomar mejores decisiones y crear el responsive design desde el inicio
// de preferencia siempre estandarizar: si es folder products/ entonces que sea orders/ en plural y minúscula

// TODOs
// por alguna razón me siguen saliendo los console.logs del use client en la consola del server