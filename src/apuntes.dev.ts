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



// s59
// prisma orm: prisma query, prisma migrate y prisma studio
// pnpm i -D prisma ; pnpm i @prisma/client ; pnpm exec prisma init ; 
// crear el dockerfile ; actualizar el .env ; definir los models siguiendo la documentación uff que top esa documentación ez relations ; pnpm exec prisma migrate dev -> darle nombre category_product_relation ejm ; pnpm exec prisma studio uff joyita pero de pago en prod v':
// seguir documentación de prisma seed para generar nuestro seed ez -> el categoryId está hardcodead en products.ts por eso si borramos el id autoincremental aumentará y no habrá match, de paso no guardar data en el volume de dockerfile -> agregué el --transpile-only para obviar el tipado según prisma docs y da error de bundler, pero al final de la misma documentación dice que para next hay que usar un comando especial de --compiler-options xd -> validar con pnpm exec prisma studio

// TODOs
// estaría bueno usar el connection string de la db como una variable de entorno



// 60
// el data fetching es usar un async await en componentes :o junto al prismaClient nomás -> notar que se usa una instancia global de "prisma" para evitar tener un pool de conexiones abierto
// iterar en el arreglo de categories obtenido ez
// básicamente lo más importante además de usar Image y Link es el routing dinámico con folders anidados usando [my_param]



// 61
// usar prisma o sql para traer todas las categorías
// iterarlas y renderizarlas
// me parece mejor usar el width y height para definir los ratios, eso ya escala solito, usar el fill a veces no funca bien -> quality puede ser útil para reducir pesos de imágenes, no olvidar darle título y agregar button que luego será "use client"
// el params solo está definido en archivos asociados al routing dinámico: page, layout, route y uno raro llamado generateMetaData -> usar useParams en otros files tipo componentes de ui, pero se tiene que agregar el "use client", se puede agregar un genérico para tiparlo, agregar clases condicionales para resaltar category seleccionada
// notar el caching de querys al cambiar de category, lazy loading de Images y la conversión de jpb o svg a webp incluso modificando quality de Image


// TODOs
// si entramos primero a /order y clickeamos cafe se muestras las imágenes, pero si ingresamos directamente a /order/cafe aparece broken y se muestra su alt xd